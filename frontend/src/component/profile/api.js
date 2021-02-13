import { axiosRequest } from './../common/helper/hepler';

export const fetchProfileApi = async (token) => {
    return await axiosRequest("GET", "/api/profile", null, token);
};

export const changeProfilePhotoApi = async (value,token)=> {
    return await axiosRequest("POST","/api/profile/add_profile_pic",value,token)
};

export const changeCoverPhotoApi = async (value,token)=> {
    return await axiosRequest("POST","/api/profile/add_cover_pic",value,token)
};

export const removeProfilePhotoApi = async (value,token)=> {
    return await axiosRequest("POST","/api/profile",value,token)
}

export const removeCoverPhotoApi = async (value,token)=> {
    return await axiosRequest("POST","/api/profile",value,token)
}