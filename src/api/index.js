
import ajax from '../utils/index';

export const reqRegister = (user) => ajax("/api/register",user,"POST");

export const reqLogin = (user) => ajax("/api/login",user,"POST");

export const reqUser = () => ajax('/api/user');

export const reqFacilities = () => ajax('/api/facilities');

export const reqUpgrade_Facilities = (id) => ajax('/api/upgrade_facilities',id,"POST");

export const reqGet_Upgrade_Facilities = (id) => ajax('/api/get_upgrade_facilities',id,"POST");
export const reqCreate_Player = (info) => ajax('/api/createplayer',info,"POST");
export const reqGet_Player = (info) => ajax('/api/get_player',info,"GET");
export const reqGet_Player_info = (info) => ajax('/api/get_player_info',info,"GET");
export const reqSet_Player_Experien = (info) => ajax('/api/set_play_experien',info,"POST");
export const reqSet_Player_NickName = (info) => ajax('/api/set_player_nickname',info,"POST");
export const reqSet_Player_Types = (info) => ajax('/api/set_player_types',info,"POST");
export const reqDelete_Player = (info) => ajax('/api/delete_player',info,"POST");
export const reqSet_User_Formation = (info) => ajax('/api/set_user_formation',info,"POST");


export const reqGet_Starter = (info) => ajax('/api/get_starter',info,"GET");
export const reqSet_Starter = (info) => ajax('/api/set_starter',info,"POST");