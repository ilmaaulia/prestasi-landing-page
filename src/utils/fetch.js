import axios from 'axios'
import { config } from '../config'

const getData = async (url, params) => {
  return await axios.get(`${config.api_host_prod}${url}`, { params })
}

export { getData }
