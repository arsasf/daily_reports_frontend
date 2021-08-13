import styles from "./ManageEmployees.module.css";
import {
  Container,
  Row,
  Col,
  Image,
  Dropdown,
  Button,
  Form,
  Toast,
  Modal,
} from "react-bootstrap";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import imageProfile from "../../../assets/profilepicture.png";
import {
  ArrowsDownUp,
  XSquare,
  Warning,
  CheckCircle,
  Pencil,
} from "phosphor-react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import {
  getDataMembership,
  createOfficialdom,
  getDataDivision,
  getDailyReports,
  deleteOfficialdom,
  updateOfficialdom,
} from "../../../redux/actions/officialdom";

function ManageEmployees(props) {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sort, setSort] = useState(false);
  const [id, setId] = useState(false);
  const [employee, setEmployee] = useState({});
  const [update, setUpdate] = useState(false);
  const [manager] = useState(
    props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_role === "manager"
          ? true
          : props.history.push("/dashboard")
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

  const [members, setMembers] = useState([]);
  const [nameEmployee, setNameEmployee] = useState("Choose Name Employee");
  const [userImage, setUserImage] = useState("");
  const [division, setDivision] = useState("Choose division employee");
  const [status, setStatus] = useState("Choose status employee");
  let [getData] = useState([]);
  const [form, setForm] = useState({
    officialdomNIK: "",
    officialdomDivision: "",
    officialdomStatus: "",
  });
  useEffect(() => {
    getData();
  }, [getData]);

  getData = () => {
    props
      .getDataMembership()
      .then((res) => {
        setMembers(res.value.data.data);
      })
      .catch((err) => {
        if (err) {
          console.log(err.response.data.msg);
        }
      });
  };

  const handleChooseEmployee = (image, name, nik) => {
    setUserImage(image);
    setNameEmployee(name);
    setForm({
      ...form,
      officialdomNIK: nik,
    });
  };

  const handleDivision = (param) => {
    setDivision(param);
    setForm({
      ...form,
      officialdomDivision: param,
    });
  };

  const handleStatus = (param) => {
    setStatus(param);
    setForm({
      ...form,
      officialdomStatus: param,
    });
  };

  const resetForm = () => {
    setUserImage("");
    setEmployee({
      user_image: "",
      user_fullname: "",
    });
    setUpdate(false);
    setNameEmployee("Choose name employee");
    setDivision("choose division employee");
    setStatus("choose status employee");
    setForm({
      officialdomNIK: "",
      officialdomDivision: "",
      officialdomStatus: "",
    });
  };

  const handleSubmit = () => {
    props
      .createOfficialdom(form)
      .then((res) => {
        getData();
        handleReset();
        resetForm();
        setError(false);
        setShow(true);
        setMsg("Success add membership!");
      })
      .catch((err) => {
        if (err) {
          setError(true);
          setShow(true);
          setMsg(err.response.data.msg);
          resetForm();
        }
      });
  };

  //**======================================================================== */
  let [getDailyReports] = useState([]);
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

  useEffect(() => {
    getDailyReports();
  }, [getDailyReports]);

  getDailyReports = (param) => {
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

  //*=========================================================
  const handleShow = (param1) => {
    setShowModal(param1);
    setMsg("Are you sure to delete this image ?");
  };

  const handleDeleteMembership = (id) => {
    setShowModal(false);
    props
      .deleteOfficialdom(id)
      .then((res) => {
        setShow(true);
        setError(false);
        setMsg("Success delete membership!");
        handleReset();
        getData();
      })
      .catch((err) => {
        setShow(true);
        setError(true);
        setMsg(err.response.data.msg);
        handleReset();
        getData();
      });
  };

  const handleUpdate = (id) => {
    setUpdate(false);
    props
      .updateOfficialdom(id, form)
      .then((res) => {
        getData();
        handleReset();
        resetForm();
        setError(false);
        setShow(true);
        setMsg("Success update membership!");
      })
      .catch((err) => {
        if (err) {
          setError(true);
          setShow(true);
          setMsg(err.response.data.msg);
          resetForm();
        }
      });
  };

  const handleUpdateMembership = (item) => {
    setShowModal(false);
    setUpdate(true);
    setDivision(item.officialdom_division);
    setStatus(item.officialdom_status);
    setForm({
      officialdomNIK: item.user_nik,
      officialdomDivision: item.officialdom_division,
      officialdomStatus: item.officialdom_status,
    });
  };

  const handleModal = () => {
    setShowModal(true);
    setMsg("What do you want ?");
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => handleShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className={styles.modalBody}>
          <div className={styles.boxClose}>
            <XSquare
              size={24}
              color="white"
              className={styles.iconClose}
              onClick={() => handleShow(false)}
            />
          </div>
          <Warning size={60} color="yellow" />
          {msg}
          <div className={styles.boxThumbs}>
            <Button
              variant="info"
              className={styles.buttonInfo}
              onClick={() => props.history.push(`/employee-information/${id}`)}
            >
              Info
            </Button>
            <Button
              variant="warning"
              className={styles.buttonUpdate}
              onClick={() => handleUpdateMembership(employee)}
            >
              Update
            </Button>
            <Button
              variant="light"
              className={styles.buttonSure}
              onClick={() => handleDeleteMembership(id)}
            >
              Delete
            </Button>
            <Button
              variant="dark"
              className={styles.buttonCancelDelete}
              onClick={() => handleShow(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Toast
        className={
          error === false ? styles.createDataToast : styles.createDataToastError
        }
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Body className={styles.bodyToast}>
          <div className={styles.boxClose}>
            <XSquare
              size={24}
              color="white"
              onClick={() => setShow(false)}
              className={styles.iconClose}
            />
          </div>
          {error === false ? (
            <CheckCircle size={80} color="#34ef53" />
          ) : (
            <Warning size={80} color="#bc1823" />
          )}
          <h1>{msg}</h1>
        </Toast.Body>
      </Toast>
      <Navbar
        manager={manager}
        manageEmployees={true}
        history={props.history}
        user={user}
      />
      <Container fluid className={styles.container}>
        <Row>
          <Col lg={5} md={12} sm={12} xs={12} className={styles.left}>
            {update === false ? (
              <Image
                src={
                  userImage !== ""
                    ? `${process.env.REACT_APP_IMAGE_URL}${userImage}`
                    : imageProfile
                }
                alt="profile"
                className={styles.imageProfile}
              />
            ) : (
              <Image
                src={
                  employee.user_image !== ""
                    ? `${process.env.REACT_APP_IMAGE_URL}${employee.user_image}`
                    : imageProfile
                }
                alt="profile"
                className={styles.imageProfile}
              />
            )}

            {update === false ? (
              <Dropdown className={styles.dropdown}>
                <Dropdown.Toggle
                  variant="#fff"
                  className={styles.dropdownToggle}
                >
                  {nameEmployee}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu} align="center">
                  {members.length > 0 ? (
                    members.map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          className={styles.listDropdown}
                          onClick={() =>
                            handleChooseEmployee(
                              item.user_image,
                              item.user_fullname,
                              item.user_nik
                            )
                          }
                        >
                          {item.user_fullname}
                        </Dropdown.Item>
                      );
                    })
                  ) : (
                    <Dropdown.Item className={styles.listDropdown}>
                      Member Allready Added to Membership
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <h1>{employee.user_fullname}</h1>
            )}
          </Col>
          <Col lg={7} md={12} sm={12} xs={12} className={styles.right}>
            <h1>Manage Employee</h1>
            <div className={styles.boxForm}>
              <h3>Division</h3>
              <Dropdown>
                <Dropdown.Toggle
                  variant="#fff"
                  className={styles.dropdownToggle}
                >
                  {division}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu} align="center">
                  <Dropdown.Item
                    className={styles.listDropdown}
                    onClick={() => setDivision("Choose Division Employee")}
                  >
                    Choose Division Employee
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listDropdown}
                    onClick={() => handleDivision("finance")}
                  >
                    Finance
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listDropdown}
                    onClick={() => handleDivision("developer")}
                  >
                    Developer
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listDropdown}
                    onClick={() => handleDivision("manager")}
                  >
                    Manager
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className={styles.boxForm}>
              <h3>Status</h3>
              <Dropdown>
                <Dropdown.Toggle
                  variant="#fff"
                  className={styles.dropdownToggle}
                >
                  {status}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu} align="center">
                  <Dropdown.Item
                    className={styles.listDropdown}
                    onClick={() => setStatus("Choose Status Employee")}
                  >
                    Choose Status Employee
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listDropdown}
                    onClick={() => handleStatus("active")}
                  >
                    Active
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={styles.listDropdown}
                    onClick={() => handleStatus("nonactive")}
                  >
                    Nonactive
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className={styles.boxButton}>
              <Button
                variant="light"
                className={styles.buttonReset}
                onClick={() => resetForm()}
              >
                Reset
              </Button>
              <Button
                variant="light"
                className={styles.buttonSubmit}
                onClick={
                  update === false
                    ? () => handleSubmit()
                    : () => handleUpdate(id)
                }
              >
                {update === false ? "Submit" : "Update"}
              </Button>
            </div>
          </Col>
        </Row>
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
                    <Button key={index} variant="light">
                      <h6 className={styles.nameEmployee}>
                        {item.user_fullname}
                      </h6>
                      <h6>{item.officialdom_division}</h6>
                      <h6>{item.officialdom_status}</h6>
                      <h6>{item.officialdom_created_at.slice(0, 10)}</h6>
                      <Pencil
                        color="#bc1823"
                        size={24}
                        onClick={() => {
                          handleModal();
                          setId(item.officialdom_id);
                          setEmployee(item);
                        }}
                      />
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
              <Dropdown.Toggle variant="#fff" className={styles.dropdownToggle}>
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
              <Dropdown.Toggle variant="#fff" className={styles.dropdownToggle}>
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
              <Dropdown.Toggle variant="#fff" className={styles.dropdownToggle}>
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
                className={styles.buttonResetFilter}
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

const mapDispatchToProps = {
  getDataMembership,
  createOfficialdom,
  getDataDivision,
  getDailyReports,
  deleteOfficialdom,
  updateOfficialdom,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployees);
