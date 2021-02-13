import { axiosRequest } from './../common/helper/hepler';

export const updateProfileAdditionalInfoApi = async (value, token) => {
    await axiosRequest("POST", "/api/profile/add_additional_info", value, token)
}