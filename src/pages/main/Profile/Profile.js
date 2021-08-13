import styles from "./Profile.module.css";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Toast,
  InputGroup,
  Modal,
} from "react-bootstrap";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import imageProfile from "../../../assets/profilepicture.png";
import {
  Eye,
  EyeClosed,
  Pencil,
  X,
  XSquare,
  Warning,
  CheckCircle,
} from "phosphor-react";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { connect } from "react-redux";
import {
  getUserByNik,
  updatePassword,
  updateUser,
  deleteImage,
} from "../../../redux/actions/userProfile";

function Profile(props) {
  const [eyeShowNew, setEyeShowNew] = useState(false);
  const [eyeShowConfirm, setEyeShowConfirm] = useState(false);
  const [files, setFiles] = useState([]);
  let [getUser] = useState([]);
  let [user, setUser] = useState(
    props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0]
        : []
      : []
  );
  const [form, setForm] = useState({
    userFullname: props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_fullname
        : ""
      : "",
    userEmail: props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_email
        : ""
      : "",
    userNik: props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_nik
        : ""
      : "",
    userRole: props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_role
        : ""
      : "",
    userPhoneNumber: props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_phone_number
        : ""
      : "",
    userNewPassword: "",
    userConfirmPassword: "",
  });
  const [update, setUpdate] = useState(false);
  const [save, setSave] = useState(false);
  const [managePassword, setManagePassword] = useState(false);
  const [manager] = useState(
    props.userProfile
      ? props.userProfile.data.length > 0
        ? props.userProfile.data[0].user_role === "manager"
          ? true
          : false
        : false
      : false
  );
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setFiles([]);
    setSave(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setSave(true);
    },
  });
  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div className={styles.boxTrash}>
        <Image src={file.preview} className={styles.imageProfile} />
      </div>
    </div>
  ));
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    getUser();
  }, [getUser]);

  getUser = () => {
    props
      .getUserByNik()
      .then((res) => {
        setUser(res.value.data.data[0]);
        setForm({
          ...form,
          userFullname: res.value.data.data[0].user_fullname,
          userEmail: res.value.data.data[0].user_email,
          userNik: res.value.data.data[0].user_nik,
          userRole: res.value.data.data[0].user_role,
          userPhoneNumber: res.value.data.data[0].user_phone_number,
        });
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  const handleUpdateProfile = (file) => {
    setWaiting(true);
    const formData = new FormData();
    formData.append("userFullname", form.userFullname);
    formData.append("userEmail", form.userEmail);
    formData.append("userNik", form.userNik);
    formData.append("userRole", form.userRole);
    formData.append("userPhoneNumber", form.userPhoneNumber);
    formData.append("image", file);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    props
      .updateUser(formData)
      .then((res) => {
        setUpdate(false);
        setUser(res.value.data.data);
        setError(false);
        setShow(true);
        setMsg("Success change profile!");
        setWaiting(false);
        setSave(false);
        getUser();
      })
      .catch((err) => {
        setFiles([]);
        setSave(false);
        setUpdate(false);
        setError(true);
        setShow(true);
        setWaiting(false);
        setMsg(err.response.data.msg);
      });
  };

  const handleDeleteProfile = () => {
    setWaiting(true);

    props
      .deleteImage()
      .then((res) => {
        setUpdate(false);
        setUser(res.value.data.data);
        setError(false);
        setShowModal(false);
        setShow(true);
        setMsg("Success delete Image Profile!");
        setWaiting(false);
        setSave(false);
        getUser();
      })
      .catch((err) => {
        setFiles([]);
        setSave(false);
        setUpdate(false);
        setError(true);
        setShowModal(false);
        setShow(true);
        setWaiting(false);
        setMsg(err.response.data.msg);
      });
  };
  const handleShow = (param1) => {
    setShowModal(param1);
    setMsg("Are you sure to delete this image ?");
  };

  const handleChangePassword = () => {
    const setData = {
      userNewPassword: form.userNewPassword,
      userConfirmPassword: form.userConfirmPassword,
    };
    console.log(setData);
    props
      .updatePassword(setData)
      .then((res) => {
        setUpdate(false);
        setUser(res.value.data.data);
        setError(false);
        setShow(true);
        setMsg("Success change password!");
        setWaiting(false);
        setSave(false);
        setEyeShowConfirm(false);
        setEyeShowNew(false);
        setForm({
          ...form,
          userNewPassword: "",
          userConfirmPassword: "",
        });
        setManagePassword(false);
        getUser();
      })
      .catch((err) => {
        setForm({
          ...form,
          userNewPassword: "",
          userConfirmPassword: "",
        });
        setEyeShowConfirm(false);
        setEyeShowNew(false);
        setSave(false);
        setUpdate(false);
        setError(true);
        setShow(true);
        setWaiting(false);
        setMsg(err.response.data.msg);
      });
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
              variant="light"
              className={styles.buttonSure}
              onClick={() => handleDeleteProfile()}
            >
              Sure
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
        profile={true}
        manager={manager}
        history={props.history}
        user={user}
      />
      <Container fluid className={styles.container}>
        <Row>
          <Col lg={5} md={12} sm={12} xs={12} className={styles.left}>
            <div className={styles.boxProfile}>
              {thumbs.length === 0 ? (
                <Image
                  src={
                    user.user_image !== ""
                      ? `${process.env.REACT_APP_IMAGE_URL}${user.user_image}`
                      : imageProfile
                  }
                  alt="profile"
                  className={styles.imageProfile}
                />
              ) : (
                thumbs
              )}

              <div
                {...getRootProps({ className: "dropzone" })}
                className={styles.boxDropzone}
              >
                <input {...getInputProps()} />
                <h1 className={styles.boxDropzone}>Choose Image Max 3MB</h1>
              </div>
              <Button
                variant="light"
                className={styles.buttonSave}
                onClick={
                  save === false
                    ? () => handleShow(true)
                    : () => handleUpdateProfile(files[0])
                }
              >
                {save === false ? "Delete Image" : "Save Image"}
              </Button>
              {save === true && (
                <Button
                  variant="dark"
                  className={styles.buttonCancel}
                  onClick={() => handleCancel()}
                >
                  Cancel Update Image
                </Button>
              )}
            </div>
          </Col>
          <Col lg={7} md={12} sm={12} xs={12} className={styles.right}>
            <div className={styles.profile}>
              <div className={styles.boxManageProfile}>
                <h1>Manage Your Profile</h1>
                {update === true ? (
                  <X
                    color="black"
                    size={30}
                    onClick={() => setUpdate(false)}
                    className={styles.edit}
                  />
                ) : (
                  <Pencil
                    color="#bc1823"
                    size={30}
                    onClick={() => setUpdate(true)}
                    className={styles.edit}
                  />
                )}
              </div>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Input your name."
                  className={
                    update === true
                      ? styles.placeholder
                      : styles.placeholderDisable
                  }
                  value={form.userFullname}
                  name="userFullname"
                  disabled={update === true ? false : true}
                  onChange={(e) => changeText(e)}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>NIK</Form.Label>
                <Form.Control
                  type="text"
                  pattern="[0-9]{1}"
                  maxLength="16"
                  placeholder="Input your NIK, 16 digits number."
                  className={styles.placeholderDisable}
                  value={form.userNik}
                  name="userNik"
                  disabled={true}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Input your email."
                  className={
                    update === true
                      ? styles.placeholder
                      : styles.placeholderDisable
                  }
                  value={form.userEmail}
                  name="userEmail"
                  disabled={update === true ? false : true}
                  onChange={(e) => changeText(e)}
                />
              </Form.Group>
              <div>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>Role</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inputyour role."
                    className={styles.placeholderDisable}
                    value={form.userRole}
                    name="userRole"
                    disabled
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input your phone number."
                    className={
                      update === true
                        ? styles.placeholder
                        : styles.placeholderDisable
                    }
                    value={form.userPhoneNumber}
                    name="userPhoneNumber"
                    disabled={update === true ? false : true}
                    onChange={(e) => changeText(e)}
                  />
                </Form.Group>
                {update === true && (
                  <Button
                    variant="light"
                    className={styles.buttonSignIn}
                    onClick={() => handleUpdateProfile(files[0])}
                  >
                    {waiting === false
                      ? "Change Data Profile"
                      : "Waiting Process Update..."}
                  </Button>
                )}
              </div>
            </div>
            <Button
              variant="light"
              className={styles.buttonSignIn}
              onClick={
                managePassword === true
                  ? () => setManagePassword(false)
                  : () => setManagePassword(true)
              }
            >
              {managePassword === true
                ? "Cancel Change Password"
                : "Manage My Password"}
            </Button>

            {managePassword === true && (
              <div className={styles.boxManagePassword}>
                <h1>Manage Your Password</h1>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>
                    New Password
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={eyeShowNew === false ? "password" : "text"}
                      placeholder="Input your new password."
                      className={styles.placeholder}
                      value={form.userNewPassword}
                      name="userNewPassword"
                      onChange={(e) => changeText(e)}
                      required
                    />
                    <InputGroup.Text className={styles.boxEye}>
                      {eyeShowNew === false ? (
                        <Eye
                          color="black"
                          size={24}
                          onClick={() => setEyeShowNew(true)}
                        />
                      ) : (
                        <EyeClosed
                          color="#bc1823"
                          size={24}
                          onClick={() => setEyeShowNew(false)}
                        />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.formLabel}>
                    Confirm Password
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={eyeShowConfirm === false ? "password" : "text"}
                      placeholder="Input your confirm password."
                      className={styles.placeholder}
                      value={form.userConfirmPassword}
                      name="userConfirmPassword"
                      onChange={(e) => changeText(e)}
                      required
                    />
                    <InputGroup.Text className={styles.boxEye}>
                      {eyeShowConfirm === false ? (
                        <Eye
                          color="black"
                          size={24}
                          onClick={() => setEyeShowConfirm(true)}
                        />
                      ) : (
                        <EyeClosed
                          color="#bc1823"
                          size={24}
                          onClick={() => setEyeShowConfirm(false)}
                        />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Button
                  variant="light"
                  className={styles.buttonSignIn}
                  onClick={() => handleChangePassword()}
                >
                  {waiting === false
                    ? "Change your Password"
                    : "Waiting process.."}
                </Button>
              </div>
            )}
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
});

const mapDispatchToProps = {
  getUserByNik,
  updatePassword,
  updateUser,
  deleteImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
