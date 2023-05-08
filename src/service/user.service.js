/**
* Author: zdyang
* Date: 2023-05-08 19:19:12
* LastEditors: zdyang
* LastEditTime: 2023-05-08 20:07:37
* FilePath: \NodeJS\coderhub\src\service\user.service.js
* Description: 用户相关接口数据库查询具体逻辑处理
*
 */
const connections = require('../app/database');

class UserService {
  async register(user) {
    const { name, password } = user;
    const statement = 'INSERT project_users (name, password) VALUES(?, ?)';
    const result = connections.execute(statement, [name, password]);
    return result;
  }
}

module.exports = new UserService();
