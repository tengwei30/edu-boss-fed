// 资源相关请求模块

import request from "@/utils/request";

export const getResourcePage = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/resource/getResourcePages",
    headers: { "content-type": "application/json;charset=UTF-8" },
    data
  });
};
