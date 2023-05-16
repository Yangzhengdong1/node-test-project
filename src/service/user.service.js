/**
 * Author: zdyang
 * Date: 2023-05-08 19:19:12
 * @LastEditors: zdyang
 * @LastEditTime: 2023-05-15 17:12:55
 * FilePath: \NodeJS\coderhub\src\service\user.service.js
 * Description: 用户相关接口数据库查询具体逻辑处理
 *
 */
const connections = require('../app/database');

class UserService {
  async register(user) {
    let body;
    const { name, password } = user;
    const statement = 'INSERT users (name, password) VALUES(?, ?)';
    try {
      const result = await connections.execute(statement, [ name, password ]);
      if ( result[0] ) {
        body = {
          status: 200,
          message: '注册成功~'
        };
      } else {
        console.log('创建用户出了点问题~');
      }
      // return result[0];
    } catch (e) {
      body = {
        status: 400,
        message: '注册失败~'
      };
      console.log('用户插入数据库失败~');
    }
    return body;
  }
  
  async getUserName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connections.execute(statement, [ name ]);
    return result[0];
  }
}

module.exports = new UserService();
