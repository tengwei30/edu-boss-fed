import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";
import store from "@/store/index";

Vue.use(VueRouter);

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue")
  },
  {
    path: "/",
    component: Layout,
    meta: {
      requiresAuth: true // 自定义对象
    },
    children: [
      {
        path: "", // 默认子路由
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/index.vue")
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: "role" */ "@/views/role/index.vue")
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/menu/index.vue")
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(
            /* webpackChunkName: "resource" */ "@/views/resource/index.vue"
          )
      },
      {
        path: "/course",
        name: "course",
        component: () =>
          import(/* webpackChunkName: "course" */ "@/views/course/index.vue")
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/index.vue")
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: "advert" */ "@/views/advert/index.vue")
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () =>
          import(
            /* webpackChunkName: "advert-space" */ "@/views/advert-space/index.vue"
          )
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/error-page/404.vue"),
    meta: {
      requiresAuth: true // 自定义对象
    }
  }
];

const router = new VueRouter({
  routes
});

/**
 *全局前置守卫，任何页面的访问都要走这
 *to 去哪
 *from 从哪来
 *next 通行标志
 */
router.beforeEach((to, from, next) => {
  // to.matched 是匹配到的路由记录，是一个数组
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: "login",
        query: {
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      });
    } else {
      next(); // 允许通过
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
export default router;
