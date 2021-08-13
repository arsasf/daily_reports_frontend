import { combineReducers } from "redux";

import auth from "./auth";
import userProfile from "./userProfile";
import officialdom from "./officialdom";
export default combineReducers({ auth, userProfile, officialdom });
