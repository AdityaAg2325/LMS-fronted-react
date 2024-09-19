import { LOGIN, LOGOUT } from "./authTypes";

const initialState = {
    id: '',
    name: '',
    email: '',
    mobileNumber: '',
    role: '',
    token: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload

        case LOGOUT:
            return initialState
            
        default:
            return state
    }
}

export default authReducer;