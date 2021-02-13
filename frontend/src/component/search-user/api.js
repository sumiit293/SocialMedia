import { axiosRequestForElasticSearch, axiosRequest } from './../common/helper/hepler';

export const searchUserApi = async (value) => {
    const param = {
        "_source": ["name", "address", "user"],
        "query": {
            "multi_match": {
                "query": value,
                "fields": ["name", "address", "college", "school", "bio"]
            }
        }
    }
    return await axiosRequestForElasticSearch("POST", `/sm_profiles/_search`, param, null);
};

export const addFriendApi = async (token, value) => {
    return await axiosRequest("POST", "/api/add-friend", value, token);
}