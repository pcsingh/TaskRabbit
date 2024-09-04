import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT, SET_METAMASK_ADDRESS, NO_ACTION, SET_METAMASK_BALANCE } from "../actions/types";

const initialState = {
	isAuthenticated: null,
	loading: true,
	user: null,
    jwt_token: null
};

const auth = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
				// contract: payload.contract,
				// token_count: payload.token_count,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
            localStorage.setItem("user", JSON.stringify(payload.user))
			return {
				...state,
				isAuthenticated: true,
				loading: false,
                user: payload.user,
                jwt_token: payload.token
			};
		case AUTH_ERROR:
		case LOGOUT:
            localStorage.clear()
            console.log('Auth Error or Logged Out')
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				user: null,
                jwt_token: null
			};
		case NO_ACTION:
		default:
			return state;
	}
};

export default auth;
