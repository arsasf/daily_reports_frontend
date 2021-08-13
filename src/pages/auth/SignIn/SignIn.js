import styles from "./SignIn.module.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Image,
  Toast,
} from "react-bootstrap";
import {
  ArrowLeft,
  Eye,
  EyeClosed,
  CheckCircle,
  Warning,
  XSquare,
} from "phosphor-react";
import { useState } from "react";
import imageLogin from "../../../assets/login.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";
import { getUserByNik } from "../../../redux/actions/userProfile";

function SignIn(props) {
  const [eyeShow, setEyeShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [errorNik, setErrorNik] = useState(false);
  const [show, setShow] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [form, setForm] = useState({
    userNik: "",
    userPassword: "",
  });

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
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
      userPassword: "",
    });
    setWaiting(false);
  };

  const handleSubmit = () => {
    setWaiting(true);
    props
      .login(form)
      .then((res) => {
        resetForm();
        localStorage.setItem("token", res.value.data.data.token);
        setShow(true);
        setError(false);
        setMsg(`Login success, Welcome Back!`);
        props.getUserByNik();
        setTimeout(() => {
          props.history.push("/dashboard");
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
              <h1>SIGN IN</h1>
            </div>
            <p>
              Welcomeback to <b>Daily Report.</b> <br /> Please enter your data
              carefully and correctly. Have a nice day !
            </p>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>NIK</Form.Label>
              <Form.Control
                type="text"
                pattern="[0-9]{1}"
                maxLength="16"
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
            <h5 className={styles.registerNow}>
              Don't have an account ?{" "}
              <b>
                <Link to="/signup" className={styles.link}>
                  Register Now
                </Link>
              </b>
            </h5>
            <Button
              variant="light"
              className={styles.buttonSignIn}
              onClick={() => handleSubmit()}
            >
              {waiting === true ? "WAITING PROCCESS..." : "SIGN IN"}
            </Button>
          </Col>
          <Col lg={4} md={12} xs={12} sm={12} className={styles.right}>
            <div className={styles.boxSignUp}>
              <Link to="/signup">
                <Button variant="light" className={styles.buttonSignUp}>
                  Sign Up
                </Button>
              </Link>
            </div>
            <Image
              src={imageLogin}
              alt="image login"
              className={styles.imageLogin}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.userProfile,
});

const mapDispatchToProps = { login, getUserByNik };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
