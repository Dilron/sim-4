

const initialState = {
    username: null,
    profileRef: null
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
// const  = ''

export function loginUser(userObj){
    return {
        type: LOGIN_USER,
        payload: {...userObj}
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: {username: null, profileRef: null}
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOGIN_USER:
            return {...payload}
        case LOGOUT_USER:
            return {...payload}
        default:
            return state
    }
}