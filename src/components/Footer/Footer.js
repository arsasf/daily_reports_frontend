import styles from "./Footer.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { SunHorizon } from "phosphor-react";

function Footer() {
  return (
    <>
      <Container fluid className={styles.container}>
        <Row>
          <Col lg={4} md={4} sm={12} xs={12} className={styles.left}>
            <div className={styles.boxLogo}>
              <SunHorizon color="#bc1823" size={80} />
            </div>
          </Col>
          <Col lg={8} md={8} sm={12} xs={12} className={styles.right}>
            <h1>Our Contacts</h1>
            <div className={styles.infoContact}>
              <div>
                <h3>Email</h3>
                <h6>dailyreport@gmail.com</h6>
                <h3>Location</h3>
                <h6>Jl. Trans Kalimantan KM 5 No. 20</h6>
              </div>
              <div>
                <h3>Facebook</h3>
                <h6>dailyreport</h6>
                <h3>Instagram</h3>
                <h6>@dailyreport</h6>
              </div>
              <div>
                <h3>Twitter</h3>
                <h6>@dailyreport</h6>
                <h3>YouTube</h3>
                <h6>dailyreport</h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
