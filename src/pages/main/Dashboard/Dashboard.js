import styles from "./Dashboard.module.css";
import { Container, Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { ArrowsDownUp } from "phosphor-react";
import { connect } from "react-redux";
import {
  getDataDivision,
  getDailyReports,
} from "../../../redux/actions/officialdom";

function Dashboard(props) {
  const [moreInfo, setMoreInfo] = useState(false);
  const [sort, setSort] = useState(false);
  const [manager] = useState(
    props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_role === "manager"
          ? true
          : false
        : false
      : false
  );
  const [user] = useState(
    props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0]
        : []
      : []
  );
  let [getChart] = useState([]);
  const [chart, setChart] = useState({
    unknown: 0,
    developer: 0,
    finance: 0,
    manager: 0,
  });
  const [query, setQuery] = useState({
    status: "active",
    day: "",
    week: "week(officialdom_created_at)",
    month: "month(officialdom_created_at)",
    year: "year(officialdom_created_at)",
    page: 1,
    limit: 10,
    dateStart: "2016-01-01",
    dateEnd: "2025-12-31",
    sort: "ASC",
    keyword: "",
  });
  const [dailyReports, setDailyReports] = useState([]);
  const [weeks, setWeeks] = useState("Weeks");
  const [months, setMonths] = useState("Months");
  const [years, setYears] = useState("Years");
  const data = {
    labels: ["Unknown", "Developer", "Finance", "Manager"],
    datasets: [
      {
        label: "Employees Membership Daily Report",
        data: [chart.unknown, chart.developer, chart.finance, chart.manager],
        backgroundColor: ["#EEEBDD", "#CE1212", "#810000", "#1B1717"],
        hoverOffset: 5,
      },
    ],
  };

  useEffect(() => {
    getChart();
  }, [getChart]);

  getChart = () => {
    props
      .getDataDivision()
      .then((res) => {
        setChart({
          unknown: res.value.data.data.unknown,
          developer: res.value.data.data.developer,
          finance: res.value.data.data.finance,
          manager: res.value.data.data.manager,
        });
      })
      .catch((err) => {
        if (err) {
          setChart({
            unknown: 0,
            developer: 0,
            finance: 0,
            manager: 0,
          });
        }
      });
  };

  const handleDailyReports = (param) => {
    setMoreInfo(param);
    const {
      status,
      day,
      week,
      month,
      year,
      page,
      limit,
      dateStart,
      dateEnd,
      sort,
      keyword,
    } = query;
    props
      .getDailyReports(
        status,
        day,
        week,
        month,
        year,
        page,
        limit,
        dateStart,
        dateEnd,
        sort,
        keyword
      )
      .then((res) => {
        setDailyReports(res.value.data.data);
      })
      .catch((err) => {
        if (err) {
          setDailyReports([]);
        }
      });
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    const {
      status,
      day,
      week,
      month,
      year,
      limit,
      dateStart,
      dateEnd,
      sort,
      keyword,
    } = query;
    props
      .getDailyReports(
        status,
        day,
        week,
        month,
        year,
        selectedPage,
        limit,
        dateStart,
        dateEnd,
        sort,
        keyword
      )
      .then((res) => {
        setDailyReports(res.value.data.data);
      })
      .catch((err) => {
        if (err) {
          setDailyReports([]);
        }
      });
  };

  const changeText = (event) => {
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
    });
  };

  const resetFilter = () => {
    setQuery({
      status: "active",
      day: "",
      week: "week(officialdom_created_at)",
      month: "month(officialdom_created_at)",
      year: "year(officialdom_created_at)",
      page: 1,
      limit: 10,
      dateStart: "2016-01-01",
      dateEnd: "2025-12-31",
      sort: "ASC",
      keyword: "",
    });
    setSort(false);
    setWeeks("Weeks");
    setMonths("Months");
    setYears("Years");
  };

  const handleButtonGo = () => {
    const { page, limit, dateStart, dateEnd, keyword } = query;
    const status = "active";
    const day = "";
    const week = "week(officialdom_created_at)";
    const month = "month(officialdom_created_at)";
    const year = "year(officialdom_created_at)";
    const sort = "ASC";
    props
      .getDailyReports(
        status,
        day,
        week,
        month,
        year,
        page,
        limit,
        dateStart,
        dateEnd,
        sort,
        keyword
      )
      .then((res) => {
        setDailyReports(res.value.data.data);
        resetFilter();
      })
      .catch((err) => {
        if (err) {
          setDailyReports([]);
          resetFilter();
        }
      });
  };

  const handleSort = (showSort, sortBy) => {
    const {
      status,
      day,
      week,
      month,
      year,
      page,
      limit,
      dateStart,
      dateEnd,
      keyword,
    } = query;
    const sort = sortBy;
    setSort(showSort);
    props
      .getDailyReports(
        status,
        day,
        week,
        month,
        year,
        page,
        limit,
        dateStart,
        dateEnd,
        sort,
        keyword
      )
      .then((res) => {
        setDailyReports(res.value.data.data);
      })
      .catch((err) => {
        if (err) {
          setDailyReports([]);
        }
      });
  };

  let countWeek = [];
  for (let i = 1; i <= 52; i++) {
    countWeek.push(i);
  }

  const countMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let countYear = [];
  for (let i = 2000; i <= 2050; i++) {
    countYear.push(i);
  }

  const changeWeek = (param1, param2) => {
    setWeeks(param1);
    setQuery({
      ...query,
      week: param2,
    });
  };

  const changeMonth = (param1, param2) => {
    setMonths(param1);
    setQuery({
      ...query,
      month: param2,
    });
  };

  const changeYear = (param1, param2) => {
    setYears(param1);
    setQuery({
      ...query,
      year: param2,
    });
  };

  const handleFilter = () => {
    const status = "active";
    const dateStart = "2016-01-01";
    const dateEnd = "2025-12-31";
    const sort = "ASC";
    const keyword = "";
    const { day, week, month, year, page, limit } = query;
    props
      .getDailyReports(
        status,
        day,
        week,
        month,
        year,
        page,
        limit,
        dateStart,
        dateEnd,
        sort,
        keyword
      )
      .then((res) => {
        setDailyReports(res.value.data.data);
        resetFilter();
      })
      .catch((err) => {
        if (err) {
          setDailyReports([]);
          resetFilter();
        }
      });
  };

  const handleReset = () => {
    const status = "active";
    const day = "";
    const week = "week(officialdom_created_at)";
    const month = "month(officialdom_created_at)";
    const year = "year(officialdom_created_at)";
    const page = 1;
    const limit = 10;
    const dateStart = "2016-01-01";
    const dateEnd = "2025-12-31";
    const sort = "ASC";
    const keyword = "";
    props
      .getDailyReports(
        status,
        day,
        week,
        month,
        year,
        page,
        limit,
        dateStart,
        dateEnd,
        sort,
        keyword
      )
      .then((res) => {
        setDailyReports(res.value.data.data);
        resetFilter();
      })
      .catch((err) => {
        if (err) {
          setDailyReports([]);
          resetFilter();
        }
      });
  };
  return (
    <>
      <Navbar
        dashboard={true}
        manager={manager}
        history={props.history}
        user={user}
      />
      <Container fluid className={styles.container}>
        <Row>
          <Col lg={6} md={12} sm={12} xs={12} className={styles.left}>
            <div className={styles.chart}>
              <Doughnut data={data} />
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12} className={styles.right}>
            <h1>Employee Chart </h1>
            <h3>
              This is a chart of the number <br />
              of employees in the <b>current year.</b>
            </h3>
            <Button
              variant="light"
              className={styles.buttonMoreInformation}
              onClick={
                moreInfo === false
                  ? () => handleDailyReports(true)
                  : () => setMoreInfo(false)
              }
            >
              {moreInfo === false
                ? "Check Daily Reports"
                : "Close Daily Reports"}
            </Button>
          </Col>
        </Row>
        {moreInfo === false ? (
          ""
        ) : (
          <Row className={styles.rowDown}>
            <Col lg={9} md={12} sm={12} xs={12} className={styles.leftDown}>
              <h1>Daily Reports</h1>
              <div className={styles.boxFilterLeft}>
                <div className={styles.box2Date}>
                  <Button variant="light">
                    <Form.Control
                      type="date"
                      className={styles.date}
                      name="dateStart"
                      value={query.dateStart}
                      onChange={(event) => changeText(event)}
                    />
                  </Button>
                  <h6>to</h6>
                  <Button variant="light">
                    <Form.Control
                      type="date"
                      className={styles.date}
                      name="dateEnd"
                      value={query.dateEnd}
                      onChange={(event) => changeText(event)}
                    />
                  </Button>
                </div>
                <div className={styles.boxSearch}>
                  <Form.Control
                    type="text"
                    placeholder="Search by name employee..."
                    className={styles.placeholder}
                    name="keyword"
                    value={query.keyword}
                    onChange={(event) => changeText(event)}
                  />
                  <Button variant="light" onClick={() => handleButtonGo()}>
                    Go
                  </Button>
                </div>
              </div>
              <div className={styles.boxTable}>
                <div className={styles.boxAscDesc}>
                  <ArrowsDownUp
                    color={sort === false ? "#bc1823" : "black"}
                    size={30}
                    className="mb-3 ml-auto"
                    onClick={
                      sort === false
                        ? () => handleSort(true, "DESC")
                        : () => handleSort(false, "ASC")
                    }
                  />
                </div>
                {dailyReports.length > 0 ? (
                  dailyReports.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        variant="light"
                        onClick={() =>
                          props.history.push(
                            `/employee-information/${item.officialdom_id}`
                          )
                        }
                      >
                        <h6 className={styles.nameEmployee}>
                          {item.user_fullname}
                        </h6>
                        <h6>{item.officialdom_division}</h6>
                        <h6>{item.officialdom_status}</h6>
                        <h6>{item.officialdom_created_at.slice(0, 10)}</h6>
                      </Button>
                    );
                  })
                ) : (
                  <h1 className={styles.notFound}>
                    Sorry... <br />
                    Data Not Found
                  </h1>
                )}

                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={
                    props.officialdom.pagination
                      ? props.officialdom.pagination.totalPage
                      : 0
                  }
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={(e) => handlePageClick(e)}
                  containerClassName={styles.pagination}
                  subContainerClassName={`${styles.pages} ${styles.pagination}`}
                  activeClassName={styles.active}
                />
              </div>
            </Col>
            <Col lg={3} md={12} sm={12} xs={12} className={styles.rightDown}>
              <h1>Filters</h1>
              <Form.Control
                type="date"
                className={styles.day}
                name="day"
                value={query.day}
                onChange={(event) => changeText(event)}
              />
              <Dropdown>
                <Dropdown.Toggle
                  variant="#fff"
                  className={styles.dropdownToggle}
                >
                  {weeks}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu} align="center">
                  {countWeek.length > 0
                    ? countWeek.map((item, index) => {
                        return (
                          <Dropdown.Item
                            className={styles.listDropdown}
                            key={index}
                            onClick={() => changeWeek(`Week-${item}`, item)}
                          >
                            Week-{item}
                          </Dropdown.Item>
                        );
                      })
                    : ""}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  variant="#fff"
                  className={styles.dropdownToggle}
                >
                  {months}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu} align="center">
                  {countMonth.length > 0
                    ? countMonth.map((item, index) => {
                        return (
                          <Dropdown.Item
                            className={styles.listDropdown}
                            key={index}
                            onClick={() => changeMonth(item, index + 1)}
                          >
                            {item}
                          </Dropdown.Item>
                        );
                      })
                    : ""}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  variant="#fff"
                  className={styles.dropdownToggle}
                >
                  {years}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu} align="center">
                  {countYear.length > 0
                    ? countYear.map((item, index) => {
                        return (
                          <Dropdown.Item
                            className={styles.listDropdown}
                            key={index}
                            onClick={() => changeYear(item, item)}
                          >
                            {item}
                          </Dropdown.Item>
                        );
                      })
                    : ""}
                </Dropdown.Menu>
              </Dropdown>
              <div className={styles.boxButtonFilter}>
                <Button
                  variant="light"
                  className={styles.buttonReset}
                  onClick={() => handleReset()}
                >
                  Reset
                </Button>
                <Button
                  variant="light"
                  className={styles.buttonFilter}
                  onClick={() => handleFilter()}
                >
                  Filter
                </Button>
              </div>
              <Button
                variant="light"
                className={styles.buttonDownload}
                onClick={() => window.print()}
              >
                Download Reports
              </Button>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.userProfile,
  officialdom: state.officialdom,
});

const mapDispatchToProps = { getDataDivision, getDailyReports };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
