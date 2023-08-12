/**
* Author: zdyang
* Date: 2023-05-20 19:34:45
* LastEditors: zdyang
* LastEditTime: 2023-06-28 20:14:32
* FilePath: \coderhub\src\service\moment.service.js
* Description: 主要处理用户动态相关接口与数据库之间的交互逻辑
*
 */
const connections = require('../app/database');

class MomentService {
  async create(params) {
    const { userId, content } = params;
    const statement = `INSERT moments(user_id, content) VALUES(?, ?);`;
    const result = await connections.execute(statement,[userId, content]);
    return result[0];
  }

  async getMomentById(id) {
    const statement = `
      SELECT 
      m.user_id AS id, m.content AS content, JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_url) AS author
      FROM moments AS m LEFT JOIN project_users AS u 
      ON m.user_id = u.id 
      WHERE m.id = ?;
    `;
    try {
      const result = await connections.execute(statement, [id]);
      return result[0];
    } catch (err) {
      console.log(err, '查询动态出错');
      return false;
    }
  }
}

module.exports = new MomentService();
