import api from '../services/api';
import { tokenStorage } from '../utils/token';

export async function login({ email, password, remember = true }) {
   const res = await api.post('/auth/login', { email, password });
   console.log('result data is',res)
//   const { access_token, refresh_token, user } = res.data;
//   tokenStorage.setToken(access_token, { remember });
//   if (refresh_token) tokenStorage.setRefresh(refresh_token);
//   return user;
}

export async function register({ name, email, password }) {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
}

export async function forgotPassword({ email }) {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
}

export async function resetPassword({ token, password }) {
  const res = await api.post('/auth/reset-password', { token, password });
  return res.data;
}
