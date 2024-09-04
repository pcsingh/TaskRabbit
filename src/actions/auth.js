import axios from "axios";
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT , SET_METAMASK_ADDRESS, NO_ACTION, SET_METAMASK_BALANCE} from "./types";
import token from '../token.json'

//Load user
export const loadUser = (token) => async (dispatch) => {
	try {
		const config = {
            headers: {
                "Content-Type": "application/json",
				"authorization": `Bearer ${token}`
			},
        };
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/user`, config);
		dispatch({
			type: USER_LOADED,
			payload: res.data.user,
		});
	} catch (error) {
		dispatch({ type: AUTH_ERROR });
	}
};

//Login user
export const login = (email, password) => async (dispatch) => {
	const body = JSON.stringify({ email, password });
	try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, body, config);
        console.log(res.data)
		// if(res?.status===200){

        // }
        dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err)
        dispatch({ type: AUTH_ERROR });
	}
};

//Signup A User
export const signup = (email, password, name) => async (dispatch) => {
	const body = JSON.stringify({ email, password , name});
	try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, body, config);
        console.log(res.data)
        dispatch({
			type: NO_ACTION,
			payload: res.data,
		});
	} catch (err) {
		console.log(err)
        dispatch({ type: AUTH_ERROR });
	}
};

// Logout
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};
