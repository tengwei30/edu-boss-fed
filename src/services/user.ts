import request from "@/utils/request";
import qs from "qs";

interface User {
  phone: string;
  password: string;
}
/**
 *
 *@param data
 */
export const login = (data: User) => {
  return request({
    method: "POST",
    url: "/front/user/login",
    data: qs.stringify(data),
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
};

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    method: "POST",
    url: "/front/user/getInfo"
  });
};
