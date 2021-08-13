import axiosApiIntances from "../../utils/axios";

export const getUserByNik = () => {
  return {
    type: "GET_USER_BY_ID",
    payload: axiosApiIntances.get("user/"),
  };
};

export const updateUser = (formData) => {
  return {
    type: "UPDATE_USER",
    payload: axiosApiIntances.patch("user/", formData),
  };
};

export const deleteImage = () => {
  return {
    type: "DELETE_IMAGE",
    payload: axiosApiIntances.patch("user/delete-image"),
  };
};

export const updatePassword = (form) => {
  return {
    type: "UPDATE_PASSWORD",
    payload: axiosApiIntances.patch("user/update-password", form),
  };
};
