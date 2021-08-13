import styles from "./SignUp.module.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Image,
  Dropdown,
  Toast,
} from "react-bootstrap";
import {
  ArrowLeft,
  Eye,
  EyeClosed,
  XSquare,
  CheckCircle,
  Warning,
} from "phosphor-react";
import { useState } from "react";
import imageSignUp from "../../../assets/signup.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../../redux/actions/auth";

function SignUp(props) {
  const [eyeShow, setEyeShow] = useState(false);
  const [role, setRole] = useState("Choose your role");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [errorNik, setErrorNik] = useState(false);
  const [show, setShow] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [form, setForm] = useState({
    userNik: "",
    userEmail: "",
    userPassword: "",
    userRole: "",
  });

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleRole = (param) => {
    if (param === "choose role") {
      setRole(param);
      setForm({
        ...form,
        userRole: "",
      });
    } else {
      setRole(param);
      setForm({
        ...form,
        userRole: param,
      });
    }
  };

  const handleNIK = (e) => {
    const check = e.target.value;
    if (check.length > 16) {
      setErrorNik(true);
      setMsg("Friend, you entered is more than 16 characters !");
    } else if (check.length <= 15) {
      setErrorNik(true);
      setMsg("Enter a number of 16 characters");
    } else {
      setErrorNik(false);
    }
    setForm({
      ...form,
      userNik: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      userNik: "",
      userEmail: "",
      userPassword: "",
      userRole: "",
    });
    setWaiting(false);
  };

  const handleSubmit = () => {
    setWaiting(true);
    props
      .register(form)
      .then((res) => {
        setShow(true);
        setError(false);
        setMsg(`Register success ! thanks for join`);
        resetForm();
        setTimeout(() => {
          props.history.push("/signin");
        }, 3000);
      })
      .catch((err) => {
        resetForm();
        setShow(true);
        setError(true);
        setMsg(err.response.data.msg);
      });
  };

  return (
    <>
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
          {msg}
        </Toast.Body>
      </Toast>
      <Container fluid className={styles.container}>
        <Row>
          <Col lg={8} md={12} xs={12} sm={12} className={styles.left}>
            <div className={styles.titleSignIn}>
              <Link to="/">
                <div className={styles.boxLogo}>
                  <ArrowLeft color="#f2eef1" size={40} />
                </div>
              </Link>
              <h1>SIGN UP</h1>
            </div>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>NIK</Form.Label>
              <Form.Control
                type="number"
                placeholder="Input your NIK, 16 digits number."
                className={styles.placeholder}
                name="userNik"
                value={form.userNik}
                onChange={(e) => handleNIK(e)}
                required
              />
              {errorNik === true && (
                <div className={styles.boxAlert}>
                  <h6>{msg}</h6>
                </div>
              )}
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={eyeShow === false ? "password" : "text"}
                  placeholder="Input your password."
                  className={styles.placeholder}
                  name="userPassword"
                  value={form.userPassword}
                  onChange={(e) => changeText(e)}
                  required
                />
                <InputGroup.Text className={styles.boxEye}>
                  {eyeShow === false ? (
                    <Eye
                      color="black"
                      size={24}
                      onClick={() => setEyeShow(true)}
                    />
                  ) : (
                    <EyeClosed
                      color="#bc1823"
                      size={24}
                      onClick={() => setEyeShow(false)}
                    />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Input your email."
                className={styles.placeholder}
                name="userEmail"
                value={form.userEmail}
                onChange={(e) => changeText(e)}
                required
              />
            </Form.Group>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>Role</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="#fff"
                  className={styles.dropdownToggle}
                >
                  <h1>{role}</h1>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu}>
                  <Dropdown.Item
                    onClick={() => handleRole("choose role")}
                    className={styles.listDropdown}
                  >
                    Choose Role
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRole("employee")}
                    className={styles.listDropdown}
                  >
                    Employee
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleRole("manager")}
                    className={styles.listDropdown}
                  >
                    Manager
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <h5 className={styles.registerNow}>
              Already have an account ?
              <b>
                <Link to="/signin" className={styles.link}>
                  Login Now
                </Link>
              </b>
            </h5>
            <Button
              variant="light"
              className={styles.buttonSubmit}
              onClick={() => handleSubmit()}
            >
              {waiting === true ? "Waiting process..." : "Submit"}
            </Button>
          </Col>
          <Col lg={4} md={12} xs={12} sm={12} className={styles.right}>
            <div className={styles.boxSignUp}>
              <Link to="/signin">
                <Button variant="light" className={styles.buttonSignIn}>
                  SIGN IN
                </Button>
              </Link>
            </div>
            <Image
              src={imageSignUp}
              alt="image login"
              className={styles.imageSignUp}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
