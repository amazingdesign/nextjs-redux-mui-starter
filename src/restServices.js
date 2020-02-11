/* eslint-disable max-lines */
import makeRestServices, { crudActionsDeclarations } from 'redux-rest-services'

import axios from './axios'
import { addErrorHandler } from './restServicesErrorHandler'

import { flashMessage } from 'redux-flash'
import { i18n } from './i18n'

const servicesDeclarations = [
  {
    name: 'randomusers',
    url: 'https://randomuser.me/api?results=10',
    transformer: (data) => data && data.results,
    actionsDeclarations: crudActionsDeclarations,
    onReceivesData: ({ method, name }, dispatch) => {
      if (['find'].includes(name)) {
        dispatch(flashMessage(
          typeof window === 'undefined' ?
            i18n.t('Data fetched on server!')
            :
            i18n.t('Data fetched by browser!')
        ))
      }
    },
  },
]

const restServicesDeclarationsWithErrorHandlers = addErrorHandler(servicesDeclarations)

const fetchFunction = (...all) => (
  axios(...all)
    .then(response => response.data)
    .catch(error => {
      console.log('axios error', error)
      return Promise.reject(error && error.response && error.response.data)
    })
)

export const restServices = makeRestServices(
  restServicesDeclarationsWithErrorHandlers,
  fetchFunction
)

export default restServices