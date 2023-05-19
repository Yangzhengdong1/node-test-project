/**
* Author: zdyang
* Date: 2023-05-08 19:19:12
* LastEditors: zdyang
* LastEditTime: 2023-05-13 11:19:09
* FilePath: \coderhub\src\service\user.service.js
* Description: 用户相关接口数据库查询具体逻辑处理，主要处理与数据库的交互
*
 */
const connections = require('../app/database');

class UserService {
  async register(user) {
    let body;
    const { name, password } = user;
    const statement = 'INSERT project_users (name, password) VALUES(?, ?)';
    try {
      // const result = await connections.execute(statement, [name, password]);
      await connections.execute(statement, [name, password]);
      body = {
        status: '200',
        message: '创建用户成功'
      };
    } catch (error) {
      body = {
        status: 400,
        message: '创建用户失败~'
      };
    }
    return body;
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM project_users WHERE name = ?`;
    const result = await connections.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new UserService();
