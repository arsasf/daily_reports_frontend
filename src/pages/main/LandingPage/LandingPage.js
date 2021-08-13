import styles from "./LandingPage.module.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { SunHorizon } from "phosphor-react";
import imageLandingPage from "../../../assets/landingpage.png";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <>
      <Container fluid className={styles.container}>
        <Row>
          <Col lg={8} md={12} xs={12} sm={12} className={styles.left}>
            <div className={styles.boxNavbarLandingPage}>
              <div className={styles.boxLogo}>
                <Link to="/">
                  <SunHorizon color="#f2eef1" size={40} />
                </Link>
              </div>
              <Link to="/signin" className={styles.link}>
                <Button variant="light" className={styles.buttonSignInSm}>
                  Sign In
                </Button>
              </Link>
            </div>
            <Image
              src={imageLandingPage}
              alt="image login"
              className={styles.imageLandingPageSm}
            />
            <h1>Daily Report</h1>
            <h5>Easy and can be used anywhere</h5>
            <Link to="/signup" className={styles.linkRegister}>
              <Button variant="light" className={styles.buttonRegister}>
                Register Now
              </Button>
            </Link>
          </Col>
          <Col lg={4} md={12} xs={12} sm={12} className={styles.right}>
            <div className={styles.boxSignIn}>
              <Link to="/signin" className={styles.link}>
                <Button variant="light" className={styles.buttonSignIn}>
                  Sign In
                </Button>
              </Link>
            </div>
            <Image
              src={imageLandingPage}
              alt="image login"
              className={styles.imageLandingPage}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default SignIn;
