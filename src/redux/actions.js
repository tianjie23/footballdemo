import { reqLogin, reqRegister, reqUser, reqFacilities ,reqSet_User_Formation, reqGet_Starter } from '../api/index';
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_FACILITIES, RESET_FACILITIES, RECEIVE_STARTER, RESET_STARTER } from './action-types';

const errorMsg = (msg) => ({ type:ERROR_MSG, data: msg });

const authsuccess = (user) => ({type: AUTH_SUCCESS, data: user});

const receiveUser = (user) => ({type: RECEIVE_USER, data: user});

const resetUser = (msg) => ({type: RESET_USER, data: msg});

const receiveFacilities = (facilities) => ({type: RECEIVE_FACILITIES, data: facilities});

const resetFacilities = (msg) => ({type: RESET_FACILITIES, data: msg});

const receiveStarter = (players) => ({type: RECEIVE_STARTER, data: players});

const resetStarter = (msg) => ({type: RESET_STARTER, data: msg});

// 异步登陆action
export const login = ({username, password, remember}) => {
    // 前台验证, 如果不通过, 返回错误信息的action
    if (!username || !password) {
        return errorMsg('用户名和密码必须输入')
    }

    return async dispatch => {
        const response = await reqLogin({username, password,remember});
        const result = response.data;
        // 如果成功了, 分发一个成功的action
        if (result.status === 0) {
            //initIO(result.data._id, dispatch);
            //getMsgList(dispatch, result.data._id);
            //console.log("result.status",result.data)
            dispatch(authsuccess(result.data))
        } else {
            // 如果失败了, 分发一个错误信息的action
            dispatch(errorMsg(result.msg))
        }
    }
};

export const register = ({username,password,confirm,phone,fcname,lx,fc},stat) => {
    if (!username || !password) {
        return errorMsg('用户名和密码必须输入')
    } else if (confirm !== password) {
        return errorMsg('两次密码要一致!')
    } else if(!phone){
        return errorMsg('请填写手机号')
    } else if(!fcname){
        return errorMsg('请填写球队名称')
    } else if(!lx || !fc){
        return errorMsg('请选择联赛或俱乐部')
    }
    return async dispatch => {
        if(stat){
        const response = await reqRegister({username, password, phone,fcname,lx,fc});
        const result = response.data;
        if (result.status === 0) {
            dispatch(authsuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
        }else{
            dispatch(errorMsg(""))
        }
    }
};

/*
异步获取用户的action
 */
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.status === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
};


/*
异步获取首发阵容
 */
export const getStarter = () => {
    return async dispatch => {
        const response = await reqGet_Starter();
        const result = response.data;
        if (result.status === 0) {
            dispatch(receiveStarter(result.data))
        } else {
            dispatch(resetStarter(result.msg))
        }
    }
};
/*
修改阵型
 */
export const setFormation = (formation,formation_position) => {
    return async dispatch => {
        const response = await reqSet_User_Formation({formation,formation_position});
        const result = response.data;
        if (result.status === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
};
/*
异步获取用户的action
 */
export const getFacilities = () => {
    return async dispatch => {
        const response = await reqFacilities();
        const result = response.data;
        if (result.status === 0) {
            dispatch(receiveFacilities(result.data))
        } else {
            dispatch(resetFacilities(result.msg))
        }
    }
};