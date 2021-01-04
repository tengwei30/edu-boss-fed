// 资源分类接口相关

import request from "@/utils/request";
export const getResourceCategories = () => {
  return request({
    method: "GET",
    url: "/boss/resource/category/getAll",
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
};
