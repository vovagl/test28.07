import axios from 'axios'

const BASE_URL = '/api' // теперь через прокси
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

function request(path, params = {}) {
  return axios.get(`${BASE_URL}/${path}`, {
    params: { key: API_KEY, ...params }
  })
}

export function getIncomes(params) {
  return request(`${BASE_URL}/incomes`, params)
}

export function getOrders(params) {
  return request(`${BASE_URL}/orders`, params)
}

export function getSales(params) {
  return request(`${BASE_URL}/sales`, params)
}

export function getStocks(params) {
  return request(`${BASE_URL}/stocks`, params)
}
