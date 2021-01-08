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

export const getAllResources = () => {
  return request({
    method: "GET",
    url: "/boss/resource/getAll"
  });
};

export const allocateRoleResources = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/resource/allocateRoleResources",
    data
  });
};

export const getRoleResources = (roleId: string | number) => {
  return request({
    method: "GET",
    url: "/boss/resource/getRoleResources",
    params: {
      roleId
    }
  });
};
