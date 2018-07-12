import {combineReducers} from 'redux'

import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_FACILITIES, RESET_FACILITIES, RECEIVE_STARTER, RESET_STARTER } from './action-types'

const initUser ={
    username:"",
    phone:"",
    fcname:"",
    fc:"",
    lx:"",
    redirectTo:""
};

function user(state=initUser,action){
    switch (action.type) {
        case AUTH_SUCCESS:
            const user=action.data;
            return {...user,redirectTo:"/login"};
        case ERROR_MSG:
            return {...state, msg:action.data};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...initUser, msg: action.data};
        default:
            return state;
    }
}

const initFacilities = {
    title:"",
    leve:1,
    userid:"",
    nowTime:"30",
    "needTime":"30",
    upgradeTime:""
};

function facilities(state=initFacilities,action){
    //console.log("zzzzz",action.type);
    switch (action.type) {
        case RECEIVE_FACILITIES:
            return action.data;
        case RESET_FACILITIES:
            return {...initFacilities, msg: action.data};
        default:
            return state;
    }
}

const initPlayer = {
    truename:""
};

function player(state=initPlayer,action){
    switch(action.type){
        case RECEIVE_STARTER:
            return action.data;
        case RESET_STARTER:
            return {...initPlayer, msg: action.data};
        default:
            return state;
    }
}

export default combineReducers({
    user,
    facilities,
    player
});