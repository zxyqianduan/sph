const tokenKey = "sph-token";
export const saveToken = (token) => {
 localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};
export const removeToken = () => {
  localStorage.removeItem(tokenKey);
};
