const initialState = {
  dataChart: [],
  dailyReports: [],
  dataById: [],
  dataMembership: [],
  isLoading: false,
  isError: false,
  msg: "",
};

const officialdom = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TOTAL_DIVISION_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "GET_TOTAL_DIVISION_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataChart: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "GET_TOTAL_DIVISION_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataChart: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_DAILY_REPORTS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "GET_DAILY_REPORTS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dailyReports: action.payload.data.data,
        pagination: action.payload.data.pagination,
        msg: action.payload.data.msg,
      };

    case "GET_DAILY_REPORTS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dailyReports: [],
        msg: action.payload.response.data.msg,
      };
    case "GET_BY_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "GET_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataById: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "GET_BY_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataById: [],
        msg: action.payload.response.data.msg,
      };

    case "GET_MEMBERSHIP_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "GET_MEMBERSHIP_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataMembership: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "GET_MEMBERSHIP_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataMembership: [],
        msg: action.payload.response.data.msg,
      };
    case "CREATE_OFFICIALDOM_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "CREATE_OFFICIALDOM_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "CREATE_OFFICIALDOM_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "DELETE_OFFICIALDOM_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "DELETE_OFFICIALDOM_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "DELETE_OFFICIALDOM_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    case "UPDATE_OFFICIALDOM_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "UPDATE_OFFICIALDOM_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case "UPDATE_OFFICIALDOM_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default officialdom;
