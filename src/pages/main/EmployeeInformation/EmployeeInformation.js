import styles from "./EmployeeInformation.module.css";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import imageProfile from "../../../assets/profilepicture.png";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDataById } from "../../../redux/actions/officialdom";

function EmployeeInformation(props) {
  const [manager] = useState(
    props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_role === "manager"
          ? true
          : false
        : false
      : false
  );
  let [getData] = useState([]);
  const [user] = useState(
    props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0]
        : []
      : []
  );

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    getData();
  }, [getData]);

  getData = () => {
    const { id } = props.match.params;
    props
      .getDataById(id)
      .then((res) => {
        setEmployee(res.value.data.data);
      })
      .catch((err) => {
        if (err) {
          setEmployee([]);
        }
      });
  };

  return (
    <>
      <Navbar manager={manager} history={props.history} user={user} />
      <Container fluid className={styles.container}>
        {employee.length > 0 ? (
          <Row>
            <Col lg={5} md={12} sm={12} xs={12} className={styles.left}>
              <Image
                src={
                  employee[0].user_image !== ""
                    ? `${process.env.REACT_APP_IMAGE_URL}${employee[0].user_image}`
                    : imageProfile
                }
                alt="profile"
                className={styles.imageProfile}
              />
              <h1>{employee[0].user_fullname}</h1>
            </Col>
            <Col lg={7} md={12} sm={12} xs={12} className={styles.right}>
              <h1>Employee Information</h1>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Division</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input division"
                  className={styles.placeholder}
                  value={employee[0].officialdom_division}
                  disabled
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Input division"
                  value={employee[0].user_email}
                  className={styles.email}
                  disabled
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Status</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Input division"
                  className={styles.placeholder}
                  value={employee[0].officialdom_status}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
        ) : (
          <Row className={styles.notFound}>
            <h1>
              Sorry...
              <br />
              Data Not Found
            </h1>
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

const mapDispatchToProps = { getDataById };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeInformation);
