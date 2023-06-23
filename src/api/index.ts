import axios from 'axios'

const headers = {
    'X-Riot-Token': process.env.REACT_APP_API_KEY,
}

const krOptions = {
    headers,
    baseURL: process.env.REACT_APP_API_URL_KR,
}

const asiaOptions = {
    headers,
    baseURL: process.env.REACT_APP_API_URL_ASIA,
}

export const krInstance = axios.create(krOptions)
export const asiaInstance = axios.create(asiaOptions)

krInstance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)

asiaInstance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)
