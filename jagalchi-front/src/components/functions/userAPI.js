import axios from "axios"
import { SERVER_URL } from "../../gobal";
export const getUser = async (userID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/user/" + userID;
    try {
        const userData = await axios.get(url);
        return userData.data;
    } catch(error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return null;
    }
}

export const getAvatarUrl = async (userID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/user/avatar/" + userID;
    const default_profile = SERVER_URL + "/uploads/avatar/default_profile.jpg";
    try {
        const retJSON = await axios.get(url);
        if(retJSON.data.avatarUrl === "") return default_profile;
        else return SERVER_URL + "/" +  retJSON.data.avatarUrl;
    } catch(error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return default_profile;
    }
}

export const getEditUser = async () => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/user/edit";
    try {
        const retJSON = await axios.get(url);
        return retJSON.data;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return null;
    }
}

export const postEditUser = async (username, birthDate, phonenum, confirmPassword) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/user/edit";
    const editInfo = {
        username, birthDate, phonenum, confirmPassword
    }
    try {
        await axios.post(url, editInfo);
        return true;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }
}

export const postPasswordChange = async (curPassword, newPassword, newPasswordCheck) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/user/change-password";
    const newPasswordInfo = {
        curPassword, newPassword, newPasswordCheck
    };
    try {
        await axios.post(url, newPasswordInfo);
        return true;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }

}

export const getAuthString = async (email) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/user/auth";
    try {
        await axios.get(url, {
            params: {email:email}
        });
        return true;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }
}