import axios from 'axios'

const options = {
    headers: {
        'X-Riot-Token': process.env.REACT_APP_API_KEY,
    },
}

export const instance = axios.create(options)

instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response.data.status.message)
)
