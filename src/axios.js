import axios from 'axios'

import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { refreshTokens, getAccessToken } from './auth'

axios.interceptors.request.use(
  (config) => {
    if(typeof window === 'undefined') return config

    const accessToken = getAccessToken()

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${ accessToken }`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

const refreshAuthLogic = failedRequest => {
  return refreshTokens()
    .then(() => {
      if(typeof window === 'undefined') return failedRequest

      const accessToken = getAccessToken()

      failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken

      return failedRequest
    })
    .catch((error) => failedRequest)
}

createAuthRefreshInterceptor(axios, refreshAuthLogic)

export default axios