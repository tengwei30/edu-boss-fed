import request from "@/utils/request";
import qs from "qs";

/**
 *
 *@param data
 */
export const createOrUpdateMenu = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/menu/saveOrUpdate",
    headers: { "content-type": "application/json;charset=UTF-8" },
    data
  });
};

/**
 *
 * @param id 菜单ID
 * */
export const getEditMenuInfos = (id: number | string = -1) => {
  return request({
    method: "GET",
    url: "/boss/menu/getEditMenuInfo",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: {
      id
    }
  });
};

/**
 *
 * 获取所有菜单列表
 * */
export const getAllMenus = () => {
  return request({
    method: "GET",
    url: "/boss/menu/getAll",
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
};

/**
 *
 * 删除菜单
 * */

export const delMenu = (id: number) => {
  return request({
    method: "DELETE",
    url: `/boss/menu/${id}`,
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
};

export const getMenuNodeList = () => {
  return request({
    method: "GET",
    url: "/boss/menu/getMenuNodeList"
  });
};

export const allocateRoleMenus = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/menu/allocateRoleMenus",
    data
  });
};

export const getRoleMenus = (roleId: string | number) => {
  return request({
    method: "GET",
    url: "/boss/menu/getRoleMenus",
    params: {
      // axios 会把 params 转换为 key=value&key=value 的数据格式放到 url 后面(以?分割)
      roleId
    }
  });
};
