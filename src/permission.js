import router from './router/index';
import store from './store/index';

router.beforeEach(async (to, from, next) => {
  let permission = null;
  let userInfo = store.state.user.userInfo;
  // 获取第一个 页面权限信息
  for (let index = to.matched.length - 1; index >= 0; index--) {
    let item = to.matched[index];
    if (item.meta && item.meta.permission) {
      permission = item.meta.permission;
      break;
    }
  }

  // 权限对象为空 添加默认值 默认需要登录
  if (!permission) {
    permission = {
      auth: true,
    };
  }

  // 角色权限限制的页面
  if (permission.role) {
    if (!userInfo) {
      return next({ path: '/login', replace: true });
    }
    if (permission.role !== userInfo.role) {
      return next({ path: '/error/403', replace: true });
    }
    return next();
  }

  // 需要 登录权限的页面
  if (permission.auth) {
    if (!userInfo) {
      return next({ path: '/login', replace: true });
    }
    return next();
  }

  return next();
});
