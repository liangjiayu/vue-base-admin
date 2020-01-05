import Mock from 'mockjs';

const users = {
  admin: {
    rolesType: 1000,
    role: 'admin',
    userName: '超级管理员',
  },
  member: {
    rolesType: 2000,
    role: 'member',
    userName: '普通成员',
  },
};

export default [
  {
    url: '/user/login',
    type: 'post',
    response: (req, res) => {
      let { username } = req.body;

      let userInfo = users[username];

      if (!userInfo) {
        return {
          code: 30000,
          message: '无该用户信息',
        };
      }

      return {
        code: 20000,
        data: userInfo,
      };
    },
  },
];
