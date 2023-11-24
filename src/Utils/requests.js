import axios from 'axios'
import { getEnvironments } from "./functions"
const { VITE_APP_URL } = getEnvironments()

export const getRequest = async (name, payload) => {
    return await axios.get(VITE_APP_URL + name, { params: payload, withCredentials: true })
        .then(resp => resp.data)
        .catch(err => err.message);
}

export const postRequest = async (name, payload) => {
    return await axios.post(VITE_APP_URL + name, payload, { withCredentials: true })
        .then(resp => resp.data)
        .catch(err => err);
}

export const deleteRequest = async (name) => {
    return await axios.delete(VITE_APP_URL + name, { withCredentials: true })
        .then(resp => resp.data)
        .catch(err => err.message);
}

export const putRequest = async (name, payload) => {
    return await axios.put(VITE_APP_URL + name, payload, { withCredentials: true })
        .then(resp => resp.data)
        .catch(err => err.message);
}