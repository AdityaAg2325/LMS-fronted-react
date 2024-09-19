import { combineReducers } from "redux";
import authReducer from "./authentication/authReducer";

const rootReducer = combineReducers({auth :authReducer})

export default rootReducer