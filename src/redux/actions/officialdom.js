import axiosApiIntances from "../../utils/axios";

export const getDataDivision = () => {
  return {
    type: "GET_TOTAL_DIVISION",
    payload: axiosApiIntances.get("officialdom/member/division"),
  };
};

export const getDailyReports = (
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
) => {
  return {
    type: "GET_DAILY_REPORTS",
    payload: axiosApiIntances.get(
      `/officialdom/?status=${status}&day=${day}&week=${week}&month=${month}&year=${year}&page=${page}&limit=${limit}&keyword=${keyword}&sort=${sort}&dateStart=${dateStart}&dateEnd=${dateEnd}`
    ),
  };
};

export const getDataById = (id) => {
  return {
    type: "GET_BY_ID",
    payload: axiosApiIntances.get(`officialdom/${id}`),
  };
};

export const getDataMembership = () => {
  return {
    type: "GET_MEMBERSHIP",
    payload: axiosApiIntances.get("officialdom/member/all-members"),
  };
};

export const createOfficialdom = (form) => {
  return {
    type: "CREATE_OFFICIALDOM",
    payload: axiosApiIntances.post("officialdom/", form),
  };
};

export const deleteOfficialdom = (id) => {
  return {
    type: "DELETE_OFFICIALDOM",
    payload: axiosApiIntances.delete(`officialdom/${id}`),
  };
};

export const updateOfficialdom = (id, form) => {
  return {
    type: "UPDATE_OFFICIALDOM",
    payload: axiosApiIntances.patch(`officialdom/${id}`, form),
  };
};
