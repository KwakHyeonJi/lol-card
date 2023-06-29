import axios from 'axios'

const otions = {
    headers: { 'X-Riot-Token': process.env.REACT_APP_API_KEY },
}

export const instance = axios.create(otions)

instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response.data.status.message)
)
