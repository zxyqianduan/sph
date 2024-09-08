import request from "@/utils";

/**
 * @description  注册账号api
 * @param {string} phone  手机号
 * @param {string} password  密码
 * @param {string} code   验证码
 * @returns
 */
export const LgoinRegister = (params) => {
  return request.post("/api/user/passport/register", params);
};

/**
 * @description  发送验证码api
 * @param {string} phone  手机号
 * @returns
 */
export const sendcode = (phone) => {
  return request.get(`/api/user/passport/sendCode/${phone}`);
};

/**
 * @description  登录api
 * @param {string} phone
 * @param {string} password
 * @returns
 */
export const Login = (params) => {
  return request.post("/api/user/passport/login", params);
};

/**
 * @description  退出登录api
 * @returns
 */
export const Loginout = () => {
  return request.get("/api/user/passport/logout");
};


/**
 * @description  获取用户信息
 * @returns 用户信息
 */
export const userInfo = () => {
  return request.get('/api/user/passport/auth/getUserInfo')
}