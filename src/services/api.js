import axios from 'axios'

const BASE_URL = 'http://109.73.206.144:6969'
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

function request(path, params = {}) {
  return axios.get(`${BASE_URL}/${path}`, {
    params: { key: API_KEY, ...params }
  })
}

export function getIncomes(params) {
  return request('incomes', params)
}

export function getOrders(params) {
  return request('orders', params)
}

export function getSales(params) {
  return request('sales', params)
}

export function getStocks(params) {
  return request('stocks', params)
}
