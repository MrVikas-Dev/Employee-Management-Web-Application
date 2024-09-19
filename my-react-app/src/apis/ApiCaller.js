import axios from "axios";

const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8080/';

export const getHome = async()=>{
    try {
        const data = await axios({
        url:API_ENDPOINT ,
        method: 'get',
        data:{
            user:1
        }
    })

    console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}

export const login = async(username,password)=>{
    try {
        const data = await axios({
            url: API_ENDPOINT + 'employee/login',
            method: 'post',
            data: {
                username, password
            }
        });
    console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}


export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}user/profile`);
    return response;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userDetails) => {
  try {
    const response = await axios.put(`${API_ENDPOINT}user/profile`, userDetails);
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const register = async({username, password, email,phone})=>{
    try {
        const data = await axios({
            url: API_ENDPOINT + 'employee/register',
            method: 'post',
            data: {
                username, password, email,phone
            }
        });
    console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}

export const getUser = async({username, password, email,phone})=>{
    try {
        const data = await axios({
            url: API_ENDPOINT + 'employee/register',
            method: 'post',
            data: {
                username, password, email,phone
            }
        });
    console.log(data.data);
    } catch (error) {
        console.error(error);
    }
}

