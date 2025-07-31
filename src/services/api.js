import axios from 'axios';

const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie';

const BASE_URL = '/api';

const api = axios.create({ baseURL: BASE_URL });

export const getStocks = (params) =>
  api.get('/stocks', { params: { key: API_KEY, ...params } });

export const getIncomes = (params) =>
  api.get('/incomes', { params: { key: API_KEY, ...params } });



export const getOrders = (params) =>
  api.get('/orders', { params: { key: API_KEY, ...params } });

export const getSales = (params) =>
  api.get('/sales', { params: { key: API_KEY, ...params } });
