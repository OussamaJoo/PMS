import axios from 'axios'

axios.defaults.baseURL ="http://localhost:8000/"

const InstanceAxios = axios.create()

InstanceAxios.interceptors.request.use(
    async config => {
        
        const token = await localStorage.getItem('token')
     
        //console.log(token)
        if (token) {
            config.headers.Authorization ='Bearer '+token
            config.headers.common['Accept'] = 'application/json';
            config.headers.put['Content-Type'] = 'application/json';
            config.headers.get['Content-Type'] = 'application/json';
            config.headers.post['Content-Type'] = 'application/json';
            config.headers.delete['Content-Type'] = 'application/json';
            console.log(config.headers.Authorization)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default InstanceAxios