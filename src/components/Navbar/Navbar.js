import styles from "./Navbar.module.css";
import { Container, Row, Image, Dropdown } from "react-bootstrap";
import { SunHorizon } from "phosphor-react";
import imageProfile from "../../assets/profilepicture.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [manager] = useState(props.manager ? props.manager : false);
  const [profile] = useState(props.profile ? props.profile : false);
  const [dashboard] = useState(props.dashboard ? props.dashboard : false);
  const [manageEmployees] = useState(
    props.manageEmployees ? props.manageEmployees : false
  );

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };
  return (
    <>
      <Container fluid className={styles.container}>
        <Row className={styles.rowContainer}>
          <div className={styles.boxMenu}>
            <div className={styles.boxLogo}>
              <SunHorizon color="#bc1823" size={40} />
            </div>
            <Link
              to="/dashboard"
              className={dashboard === true ? styles.active : styles.nonActive}
            >
              Dashboard
            </Link>
            {manager === false ? (
              <Link
                to="/profile"
                className={profile === true ? styles.active : styles.nonActive}
              >
                My Profile
              </Link>
            ) : (
              <Link
                to="/manage-employees"
                className={
                  manageEmployees === true ? styles.active : styles.nonActive
                }
              >
                Manage Employees
              </Link>
            )}

            <Dropdown>
              <Dropdown.Toggle variant="#fff" className={styles.dropdownToggle}>
                <h1
                  className={
                    profile === true ? styles.textMenuActive : styles.textMenu
                  }
                >
                  Profile
                </h1>
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                <Dropdown.Item
                  className={styles.listDropdown}
                  onClick={() => props.history.push("/profile")}
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.listDropdown}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="#fff" className={styles.dropdownToggle}>
                <Image
                  src={
                    props.user.user_image !== ""
                      ? `${process.env.REACT_APP_IMAGE_URL}${props.user.user_image}`
                      : imageProfile
                  }
                  alt="profile"
                  className={styles.imageProfile}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownMenu} align="right">
                {manager === true && (
                  <Dropdown.Item
                    className={styles.listDropdown}
                    onClick={() => props.history.push("/profile")}
                  >
                    My Profile
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  className={styles.listDropdown}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Navbar;
