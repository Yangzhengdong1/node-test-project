const connections = require('../app/database');
class TagService {
  async create(name) {
    const  statement = `INSERT INTO label(name) VALUES(?);`;
    const [result] = await connections.execute(statement, [name]);
    return result;
  }
}

module.exports = new TagService();