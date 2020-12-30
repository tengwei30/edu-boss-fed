import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import router from "@/router";
import store from "@/store";

function redirectLogin() {
  router.push({
    name: "login",
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

function refreshToken() {
  return axios.create()({
    method: "POST",
    url: "/front/user/refresh_token",
    data: qs.stringify({
      // refresh_token 只能使用一次
      refreshtoken: store.state.user.refresh_token
    })
  });
}

const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
});

// 请求拦截器
let isRefreshing = false; // 解决多次请求刷新问题
let requests: any[] = []; // 存储刷新 token 期间过来的 401 请求
request.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const { user } = store.state;
    if (user && user.access_token) {
      config.headers.Authorization = user.access_token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// 响应拦截器
request.interceptors.response.use(
  function(response) {
    // 状态码为 2XX的都会走这
    return response;
  },
  async function(error) {
    // 状态码 非 2XX的走这
    // console.dir("error --->",error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // 401、403、404、500、502、503
      const { status } = error.response;
      if (status === 400) {
        Message.error("请求参数错误");
      } else if (status === 401) {
        if (!store.state.user) {
          redirectLogin();
          return Promise.reject(error);
        }

        // 刷新token
        if (!isRefreshing) {
          isRefreshing = true; // 开启刷新状态
          // 尝试刷新Token
          return refreshToken()
            .then(res => {
              if (!res.data.success) {
                throw new Error("刷新 Token 失败");
              }
              // 把刷新成功拿到的新的token更新到容器和本地存储中
              store.commit("setUser", res.data.content);
              // 把本次失败请求发送出去， 无痛刷新
              console.log(error.config); // 请求失败的配置信息

              // 把 requests 队列中的数据重新发送出去
              requests.forEach(cb => cb());

              // 清空 requests 数组
              requests = [];
              return request(error.config);
            })
            .catch(error => {
              // 把当前登录用户状态清除
              store.commit("setUser", null);
              redirectLogin();
              return Promise.reject(error);
            });
        }
        // 刷新状态下，把请求挂起 放到 requests 中
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config));
          });
        });
      } else if (status === 403) {
        Message.error("没有权限，请联系管理员");
      } else if (status === 404) {
        Message.error("请求资源不存在");
      } else if (status >= 500) {
        Message.error("服务端错误，请联系管理员");
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      Message.error("请求超时，请刷新重试");
    } else {
      // Something happened in setting up the request that triggered an Error
      Message.error(`请求失败：${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default request;
