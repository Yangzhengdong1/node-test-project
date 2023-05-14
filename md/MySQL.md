

**为什么需要数据库？**

- 任何的系统都需要存放大量的数据，这些数据通常是非常复杂和庞大的：
  - 比如用户信息包括姓名、年龄、性别、出生日期、地址等；
  - 比如商品信息包括商品的名称、描述、价格、分类标签等；
  - 比如歌曲信息包括歌曲的名称、歌手、专辑、歌曲时长等；
- 那么这些信息难道不能直接存储到文件中吗？可以、但是文件系统有很多的缺点：
  - 很难以合适的方式组织数据（多张表之前的关系合理组织）；
  - 并且对数据进行增删改查中的复杂操作（一些简单的确实可以），并且保证操作的原子性（即我在写入数据时其他人不能写入）；
  - 很难进行数据共享，比如一个数据库需要为多个程序服务，如何进行很好的数据共享；
  - 需要考虑如何进行数据的高效备份、迁移、恢复；
- **数据库通俗来讲就是一个存储数据的仓库，数据库本质上就是一个软件、一个程序；**



**常见的数据库类型**

- 通常我们将数据库划分成两类：**`关系型数据库`**和**`非关系型数据库`**；
  - **关系型数据库**：`MySQL`、`Oracle`、`DB2`、`SQL Server`、`Postgre SQL`;
    - 关系型数据库通常我们会创建很多个二维数据表；
    - 数据表之间相互关联起来，形成一对一、一对多、多对多等关系；
    - 之后可以利用SQL语句在多张表中查询我们所需的数据；
    - 支持事务，对数据的访问更加地安全；
  - **非关系型数据库**：MongoDB、Redis、Memcached、HBse等；
    - 非关系型数据库的英文其实是 Not only SQL ，也简称为 NoSQL；
    - 相对而言非关系型数据库比较简单一些，存储数据也会更加自由（甚至我们可以直接将一个复杂的json对象直接塞入到数据库中）；
    - NoSQL是基于Key-Value的对应关系，并且查询的过程中不需要经过SQL解析，所以性能更高；
    - NoSQL通常不支持事务，需要在自己的程序中来保证一些原子性的操作；
- 如何在开发中选择它们呢？具体的选择会根据不同的项目进行综合的分析；
  - 目前在公司进行后端开发（Node、Java、Go等），还是以关系型数据库为主；
  - 比较常用的用到非关系型数据库的，在爬取大量的数据进行存储时，会比较常见；



## 1、认识MySQL

- 介绍
  - MySQL原本是一个开源的数据库，原开发者为瑞典的MySQL AB公司；
  - 在2008年被Sun公司收购；在2009年，Sun被Oracle（甲骨文）收购；
  - 所以目前MySQL归属于Oracle；

- MySQL是一个关系型数据库，其实本质上就是一款软件、一个程序；
  - 这个程序中管理着多个数据库；
  - 每个数据库中可以有多张表；
  - 每个表中可以有多条数据；
- 下载
  - https://www.mysql.com/
  - Win 推荐下载 MSI 版本，在安装过程中会自动配置一些环境变量

- 我的数据库

  ```js
  192.168.0.179 ：
            root: 123456
            look: 123456
  192.168.0.101:
            root: zdyang123.
            
  ```

  





## 2、MySQL连接操作

- 终端启用/停止MySQL服务

  ```js
  // 管理员运行cmd； MySQL80 是MySQL的服务名称
  
  // 开启服务
  net start MySQL80
  
  // 停止服务
  net start MySQL80
  ```

- 我们如果想要操作数据，需要先和数据建立一个连接，最直接的方式就是通过终端来连接；

- 终端连接数据库

  ```js
  // 方法一
  mysql -uroot -p
  
  // 方法二
  mysql -uroot -pzdyang123.
  
  // 两种方式的区别在于输入密码是直接输入，还是另起一行以密文的形式输入
  ```

- 终端操作数据库 - 显示数据库

  ```js
  SHOW DATABASES;
  ```

  - MySQL 默认的数据库：
    - infomation_schema：信息数据库，其中包括MySQL在维护的其他数据库、表、列、访问权限等；
    - performance_schema：性能数据库，记录着MySQL Server 数据库引擎在运行过程中的一些资源消耗相关的信息；
    - mysql：用于存储数据库管理者的用户信息、权限信息以及一些日志信息等；
    - sys：相当于是一个简易版的performance_schema，将性能数据库中的数据汇总成更容易理解的形式；

- 终端操作数据库 - 创建数据库 - 表

  ```js
  // 创建数据库
  create database 数据库名称;
  // 创建表
  create table 表名称(
    字段名称: 字段类型,
    name: varchar(10),
    age: int,
    height: double
  );
  
  
  // 查看数据库中的表
  show tables;
  // 查看表中的数据以及字段
  select * from 表名称;
  // 往表中插入数据
  insert into 表名 (字段名称1, 字段名称2, 字段名称3) values (value1, value2, value3);
  insert into user (name, age, height) values ('张三', 18, 1.99);
  // 查看正在使用的数据库
  select database();
  // 选中数据库
  use 数据库名称;
  
  // 退出 mysql
  quit
  ```

- **同一局域网下访问另一台机器上的数据库**

  ```js
  # 1、主机创建一个访客用户
  create user 访客用户名称@'客机IP地址' identified by '客机连接密码'; 
  
  # 2、客机连接
  mysql -h主机IP地址 -u访客用户名称 -p // 此时连接上后发现访问权限有限
  
  # 3、为访客用户授予权限
  grant all privileges on *.* to 访客用户名称@'客机IP地址' with grant option;
  
  # 4、主机刷新权限并重启服务
  flush privileges;
  
  ```

  

## 3、GUI工具

- 我们会发现在终端操作数据库有很多不方便的地方：
  - 语句写出来没有高亮，并且不会有任何的提示；
  - 复杂的语句分成多行，格式看起来并不美观，很容易出现错误；
  - 终端查看所有的数据库或者表非常地不直观和不方便；
- 所以在开发中我们可以借助一些图形化（GUI）工具来帮助我们连接上数据库，之后直接在GUI工具中操作就会非常方便。



## 4、SQL 语句

### 4.1、认识SQL语句

- 我们希望操作数据库（特别是在程序中），就需要有和数据库沟通的语言，这个语言就是SQL;
  - SQL是Structured Query Language，称之为结构化查询语句，简称 SQL；
  - 使用 SQL 编写出来的语句，就称之为SQL语句；
  - SQL语句可以用于对数据库进行操作；
- 事实上，常见的关系型数据库SQL语句都是比较相似的，所以学会了MySQL中的SQL语句，之后去操作比如Oracle或者其他关系型数据库，也是非常方便的；
- **SQL语句的常用规范**：
  - 通常关键字是大写的，比如 CREATE、TABLE、SHOW等；
  - 一条语句结束后，需要以 ; 结尾;
  - 如果遇到关键字作为表明或者字段名称，可以使用``包裹；

### 4.2、SQL语句的分类

- **常见的SQL语句我们可以分成四类**：

  - DDL(Data Definition Language)：**数据定义语言**；
    - 可以通过DDL语句对**`数据库`**或**`表`**进行：创建、删除、修改等操作；
  - DML(Data Manipulation Language)：**数据操作语言**；
    - 可以通过DML语句对**`表`**进行：添加、删除、修改等操作；
  - DQL(Data Query Language)：**数据查询语句**；
    - 可以通过DQL从数据库中**`查询记录`**；
  - DCL(Data Control Language)：**数据控制语句**；
    - 对数据库、表格的**`权限`**进行相关访问控制权限；

  

## 5、数据库的操作

### 5.1、DDL对数据库的操作

#### 查看所有的数据库

```js
show databases;
SHOW DATABASES;
```

#### 选择数据库

```js
use 数据库名称;
USE mydb;
```

#### 查看当前正在使用的数据库

```JS
select database();
SELECT DATABASE();
```

#### 创建数据库

```js
// 创建一个新的数据库；
create database 数据库名称;
CREATE DATABASE bili;

// 一般创建新的数据库之前都会判断一下这个数据库是否已经存在
create database if not exists 数据库名称;
CREATE DATABASE IF NOT EXISTS huya;

// 创建数据库时为数据库指定编码格式与排序规则
create database if not exists 数据库名称 default character set 编码格式 collate 排序规则;
CREATE DATABASE IF NOT EXISTS huya DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

#### 删除数据库

```js
drop database if exists 数据库名称;
DROP DATABASE IF EXISTS douyu;
```

#### 修改数据库编码

```js
alter database 数据库名称 character set = 编码格式 collate = 排序规则;
ALTER DATABASE huya CHARACTER SET = utf8 COLLATE = UTF8_unicode_ci;
```



### 5.2、DDL对数据表的操作

#### 查看所有表

```js
show table;
SHOW TABLE;
```

#### 新建表

```js
create table if not exists `表名` (
  `字段1` 类型,
  `字段2` 类型,
  字段3 类型
);

CREATE TABLE IF NOT EXISTS `students` (
  `name` VARCHAR(10),
  `age` int,
  score int
);
```

#### 删除表

```js
drop table if exists 表名;
DROP TABLE IF EXISTS students1;
```





## 6、数据表操作

### 6.1、SQL的数据类型

- 我们知道不同的数据会划分为不同的数据类型，在数据库中也是一样：
  - MySQL支持的数据类型有：数字类型、时间日期类型、字符串（字节和字符）类型、空间类型和JSON数据类型。

#### 6.1.1、数字类型

- MySQL的数字类型有很多：
- 整数数字类型：INTEGER，**INT**，SMALLINT，TINYINT，MEDIUMINT，BIGINT；
- 浮点数字类型：**FLOAT**，**DOUBLE**（FLOAT是四个字节，DOUBLE是8个字节）；
- 精确数字类型：DECIMAL，NUMERIC（DECIMAL是NUMERIC的实现形式）；

#### 6.1.2、日期类型

- MySQL的日期类型也很多：
- YEAR 以 YYYY 格式显示值
  - 范围 1901 到 2155，和0000；
- DATE类型用于包含日期和时间部分的值：
  - DATE 以格式 YYYY-MM-DD 显示值；
  - 支持的范围是‘1000-01-01’ 到 ‘9999-12-31’；
- **DATETIME**类型用于包含日期和时间部分的值；
  - DATETIME以格式 '`YYYY-MM-DD hh:mm:ss`' 显示值；
  - 支持的范围是 1000-01-01 00:00:00 到 9999-12-31 23：59：59;
- **TIMESTAMP** 数据类型被用于同时包含日期和时间部分的值；
  - TIMESTAMP 以格式 '`YYYY-MM-DD hh:mm:ss`' 显示值；
  - 但是它的范围是UTC的时间范围：‘1970-01-01 00:00:01’ 到 '2038-01-19 03:14:07'；
- 另外：DATETIME或者TIMESTAMP值可以包括在高达微妙（6位）精度的后小数秒一部分;
  - 比如DATETIME表示的范围可以是 '1000-01-01 00:00:00.000000' 到 '9999-13-31 23:59:59.999999';

#### 6.1.3、字符串类型

- MySQL的字符串类型表示方式如下：
- CHAR 类型在创建表时为固定长度，长度可以是 0- 255 之间的任何值；
  - 在被查询时，会删除后面的空格；
- **VARCHAR** 类型的值是可变长度的字符串，长度可以指定 0 - 65535 之间的值；
  - 在被查询时，不会删除后面的空格；
- BINARY 和 VARBINARY类型用于存储二进制字符串，存储的是字节字符串；
- BLOB用于存储大的二进制类型；
- TEXT用于存储大的字符串类型；



### 6.2、表约束

- **主键**：**PRIMARY KEY**
  - 一张表中，我们为了区分每一条记录的唯一性，必须有一个字段是永远不会重复的，并且不为空的，这个字段我们通常会将它设置为主键：
    - 主键是表中唯一的索引；
    - 并且必须是 NOT NULL 的，如果没有设置 NOT NULL ，那么MySQL会隐式地设置为 NOT NULL;
    - 主键也可以是多列索引，PRIMARY KEY(key_part,...)，我们一般称之为**`联合主键`**；
    - 开发中主键字段应该是和业务无关的，尽量不要使用业务字段类作为主键；
- **唯一**：**UNIQUE**
  - 某些字段在开发中我们希望是唯一的，不会重复的，比如身份证号、手机号等，这个字段我们可以使用UNIQUE 来约束：
  - 使用UNIQUE约束的字段在表中必须是不同的；
  - 对于所有引擎，UNIQUE索引允许NULL包含的列具有多个NULL值（即如果有多个值都为NULL也是允许的，并不会对NULL具备唯一性）；
- **不能为空**：**NOT NULL**
  - 某些字段我们要求用户必须插入值，不可以为空，这个时候我们可以使用 NOT NULL 来约束；
- **默认值**：**DEFAULT**
  - 某些字段我们希望在没有设置值的时候给予一个默认值，这个时候我们可以使用 DEFAULT 来完成；
- **自动递增**：**AUTO_INCREMENT**
  - 某些字段我们希望不设置值的时候可以进行递增，比如用户的id，这个时候可以使用 AUTO_INCREMENT 来完成；

### 6.3、DDL-具体操作

#### 6.3.1、表操作

- **新增表**

  ```js
  create tab if not exists `表名` (
    字段1 字段约束,
    字段2 字段约束,
    字段3 字段约束,
    ...
  );
  
  
  CREATE TABLE IF NOT EXISTS `user` (
    id INT PRIMARY KEY,
    `NAME` VARCHAR(20) NOT NULL,
    age INT DEFAULT 0,
    createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  ```

- **修改表名**

  ```js
  alter table 旧表名 rename to 新表名;
  
  ALTER TABLE user RENAME TO users;
  ```

- **添加新列**

  ```js
  alter table 表名 add 字段名 字段约束;
  
  ALTER TABLE `users` ADD `updateTime` TIMESTAMP;
  ```

  

#### 6.3.2、字段操作

- **修改字段名称**

  ```JS
  alter table 表名称 change 旧字段名 新字段名 约束;
  
  ALTER TABLE users CHANGE `phoneNum` `telPhone` VARCHAR(20);
  ```

- **修改字段类型**

  ```JS
  alter table 表名称 modify 字段名 约束;
  
  ALTER TABLE `users` MODIFY `name` VARCHAR(30);
  ```

- **删除字段**

  ```JS
  alter table 表名称 drop 字段名称;
  
  ALTER TABLE `users` DROP `age`;
  ```

#### 6.3.3、扩展

- 根据一个表结构去创建另一张表

  ```js
  create table 表名称 like 目标表名称;
  
  CREATE TABLE `user1` LIKE `users`;
  ```

- 根据一个表内容创建另一张表

  需要注意的是：根据表内容去创建新表时，目标表的某些约束（主键）并不会一起被创建在新表中；

  ```js
  create table 表名称 (select * from 目标表名称);
  
  CREATE TABLE `user2` (SELECT * FROM `user1`);
  ```

### 6.4、DML-对数据表的增删改

#### 6.4.1、插入数据

```js
insert into 表名称 values (字段1value, 字段2value, 字段3value, ...);
insert into 表名称 (字段名1, 字段名2, 字段名3, ...)
            values (字段1value, 字段2value, 字段3value, ...); // 一般这种用法在开发中比较常见
                    
INSERT INTO user (name, age, telPhone)
            VALUES ('张三', 18, '10010');

```

#### 6.4.2、删除数据

```js
# 删除所有数据
delete from 表名称;
DELETE FROM user1;

#删除符合条件的数据
delete from 表名称 where 条件;
DELETE FROM user1 WHERE id = 010;
```

#### 6.4.3、更新数据

```js
#更新所有的数据
update 表名称 set 字段名1 = value, 字段名2 = value;
UPDATE user1 SET name = '010', telPhone = '010'; 
#更新符合条件的数据
update 表名称 set 字段名1 = value where 条件;
UPDATE user1 SET name = '010' WHERE id = '010';
```



### 6.5、DML-数据查询

#### 6.5.1、基本查询

- **基本查询**

  ```js
  select * from 表名称;
  
  SELECT * FROM biliVideo;
  ```

- **查询指定字段**

  ```js
  select 字段一, 字段二 from 表名称;
  SELECT title, pub_index FROM biliVideo;
  
  # 为查询的字段起别名
  select 字段一 as 别名, 字段二 as 别名 from 表名称;
  SELECT title AS videoTitle, pub_index AS ecpisodeNum FROM biliVideo;
  ```




#### 6.5.2、where 条件查询

- **条件判断语句**

  ```js
  select 字段名 from 表名称 where 条件判断;
  
  # 条件 =
  SELECT title, cover FROM biliVideo WHERE pub_index = '第四话';
  
  # 条件不等
  SELECT * FROM biliVideo WHERE pub_index != '第四话';
  SELECT * FROM biliVideo WHERE pub_index <> '第四话';
  
  # 条件小于
  SELECT * FROM biliVideo WHERE id < 1;
  ```

- **逻辑运算语句**

  ```js
  select 字段名 from 表名称 where 逻辑运算判断;
  
  # 逻辑与 &&/AND
  SELECT * FROM biliVideo WHERE id = 0 && title = '名侦探柯南';
  SELECT * FROM biliVideo WHERE id = 0 AND title = '名侦探柯南';
  // between 包含等于，即查询的结果会包含id为 10 和 20 的数据
  SELECT * FROM biliVideo WHERE id BETWEEN 10 AND 20;
  
  # 逻辑或 ||/OR
  SELECT * FROM biliVideo WHERE id = 0 || id = 10;
  SELECT * FROM biliVideo WHERE id = 0 OR id = 10;
  
  # 查询 NULL 值
  SELECT * FROM biliVideo WHERE title IS NULL;
  ```

- **模糊查询**

  - 模糊查询使用 LIKE 关键字，结合两个特殊的符号：
    - % 表示匹配任意个的任意字符
    - _ 表示匹配一个的任意字符

  ```js
  # 字符前后匹配任意数量的任意字符
  SELECT * FROM biliVideo WHERE title LIKE('%的%');
  
  # 字符前面匹配一个任意字符，后面匹配任意个任意字符
  SELECT * FROM biliVideo WHERE title LIKE('_的%');
  
  # 字符前后匹配一个任意字符
  SELECT * FROM biliVideo WHERE title LIKE('_的_');
  ```

- **IN** 表示多个值符合其中一个即可

  ```js
  SELECT * FROM biliVideo WHERE id = 1 || id = 2 || id = 3;
  SELECT * FROM biliVideo WHERE id IN(1, 2, 3);
  ```



#### 6.5.3、结果排序

- 当我们查询到结果时，我们希望结果按某种方式进行排序，这个时候用的是 ORDER BY;

- ORDER BY 有两个常用的值：

  - ASC：升序排列；
  - DESC：降序排列；

  ```js
  # 当查询到结果时，按 published 字段升序排列，当 published 有相等的情况时，按 id 降序排列
  SELECT * FROM biliVideo WHERE title IN('名侦探柯南', '迪迦奥特曼', '致不灭的你') 
                                ORDER BY published ASC, id DESC;
  ```



#### 6.5.4、分页查询

- 当数据库中的数据非常多时，一次性查询到所有的结果进行显示是不太现实的；

  - 在真实开发中，我们都会要求用户传入 offset、limit 或者 page 等字段；
  - 它们的目的是让我们可以在数据库中进行分页查询；

  ```js
  # LIMIT limit OFFSET offset;
  // 从 0 开始，查询20条数据
  SELECT * FROM biliVideo LIMIT 20 OFFSET 0;
  SELECT * FROM biliVideo LIMIT 20 OFFSET 20;
  
  #LIMIT offset, limit;
  SELECT * FROM biliVideo LIMIT 0, 20;
  ```

#### 6.5.5、聚合函数

- 基本使用

  ```sql
  # 求和
  select num(字段名) from 表名称 where 条件;
  SELECT NUM(id) FROM biliVideo;
  
  # 求平均值
  select avg(字段名) from 表名称 where 条件;
  SELECT AVG(id) FROM biliVideo WHERE title LIKE('%名侦探柯南%');
  
  # 最大值和最小值
  select max(字段名) from 表名称;
  SELECT MAX(id) FROM biliVideo;
  select min(字段名) from 表名称;
  SELECT MIN(id) from biliVideo;
  
  # 求个数
  select count(字段名) from 表名称;
  SELECT COUNT(*) FROM biliVideo WHERE title = '名侦探柯南';
  // 计算 title 字段不为 NULL 的数量
  SELECT COUNT(title) FROM biliVide;
  // 计算 title 字段不为 NULL 的数量，且去重
  SELECT COUNT(DISTINCT title) FROM biliVideo;
  ```

- **GROUP BY**

  ```sql
  # GROUP BY
  select 分组, 聚合函数1, 聚合函数二, ... from 表名称 group by 字段名;
  SELECT title, AVG(id), COUNT(*) FROM biliVideo GROUP BY title;
  
  # HAVING
  // having 与 where 的区别在于 where 是对查询目标表生效的，而 having 则是对查询后的分组生效的；
  select 分组, 聚合函数1, 聚合函数二, ... from 表名称 group by 字段名 having 条件;
  SELECT title AVG(id) AS avgId, COUNT(*) FROM viliVideo GROUP BY title HAVING avgId > 20;
  ```



#### 6.5.6、



## 7、MySQL 多表操作

### 7.1、外键约束

- 创建表的时候加外键约束

  ```js
  create table 表名称(
    字段一 约束,
    字段二 约束,
    ...
    foreign key(字段名称) references 引用的表名称(引用表中被当作外键的字段名称)
  );
  ```

- 修改表中字段为外键

  ``` js
  # 添加一个新的字段并为它添加外键
  // 添加新字段
  alter table 表名称 add 字段名称 约束;
  // 为新增的字段添加外键
  alter table 表名称 add foreign key(字段名称) references 引用的表名称(引用表中被当作外键的字段名称);
  ```

- **修改/删除外键引用**

  - 当表中的某个字段被另一张表的字段引用为外键时，就不能再随意去删除或修改这个字段了；
  - 如果我希望可以更新或删除？我们需要修改 on delete 或者 on update 的值；

  - 我们可以给外键的更新或删除时设置几个值：
    - **RESTRICT**(默认操作)：当更新或删除某个记录时，会检查该记录是否有关联的外键记录，有的话会报错的，不允许更新或删除；
    - **NO ACTION**：和 restrict 是一致的，是在 SQL 标准中定义的；
    - **`CASCADE`**：**当更新或删除某个记录时，会检查该记录是否有关联的外键记录**，如果有：
      - 更新：那么会更新对应的记录；
      - 删除：那么关联的记录会被一起删除掉；
    - **SET NULL**：当更新或删除某个记录时，会检查该记录是否有关联的外键记录，有的话，将对应的值设置为 NULL；

  ```sql
  # 修改一个已有外键的字段的外键
  # 1、获取到目前外键的名称
  SHOW CREATE TABLE 表名称; // 反编译，可以查看创建这个表的命令
  
  # 2、根据名称将外键删除掉
  ALTER TABLE 表名称 DROP FOREIGN KEY 第一步获取到的外键名;
  
  # 3、重新添加外键
  LATER TABLE 表名称 ADD FOREIGN KEY (需要添加外键的字段名) REFERENCES 被引用的表(被引用的表中作为外键的字段名)
                                                          ON UPDATE CASCADE
                                                          ON DELETE RESTRICT; // 一般在开发中不会给外键的删除时添加 CASCADE ，这是很危险的，一旦外键的字段被删除了，所引用的字段数据也有可能会被删除；
  
  ```



### 7.2、多表查询（一对多）

- 默认笛卡尔乘积/直积的结果

  ```js
  SELECT * FROM 表名1, 表名2; // 这样获取到的将会是 表1总数据量 * 表2总数据量(笛卡尔乘积)的结果
  // 对笛卡尔乘积进行筛选
  SELECT * FROM 表1, 表2 WHERE 表1.字段 = 表2.字段; / 这种方式其实还是将所有的数据都查出来了之后再去做筛选，在开发中是不推荐的
  ```



#### 7.2.1、多表之间的连接（SQL JOIN）

![image-20230505203029447](C:\Users\zdyang\AppData\Roaming\Typora\typora-user-images\image-20230505203029447.png)

- 左连接

  - 如果我们希望获取到的是左边所有的数据（以左表为主）：
  - 这个时候就表示无论左边的表是否有对应的 brand_id 的值对应右边表的 id，左边的数据都会被查出来
  - 这个也是开发中使用最多的情况，它的完整写法是 **`LEFT [OUTER] JOIN`**,但是 OUTER 是可以省略的；

  ```sql
  # 查询所有的手机（包括没有品牌信息的手机）以及对应的品牌
  SELECT * FROM `products` LEFT JOIN `brand` ON products.brand_id = brand.id;
  
  # 查询没有对应品牌数据的手机
  SELECT * FROM `products` LEFT JOIN `brand` ON products.brand_id = brand.id WHERE brand.id IS NULL;
  ```

  

- 右连接

  - 如果我们希望获取到的是右边所有的数据（以右表为主）：
  - 这个时候就表示无论左边的表是否有对应的 brand_id 的值对应右边表的 id，右边的数据都会被查出来
  - 右连接在开发中没有左连接常用，它的完整写法是 **`RIGHT [OUTER] JOIN`**,但是 OUTER 是可以省略的；

  ```sql
  # 查询所有的品牌（没有对应的手机数据，品牌也显示）以及对应的手机数据
  SELECT * FROM `products` RIGHT OUTER JOIN `brand` ON products.brand_id = brand.id;
  
  # 查询没有对应手机的品牌信息
  SELECT * FROM `products` RIGHT JOIN `brand` ON products.brand_id = brand.id WHERE products.brand_id IS NULL;
  ```

  

- 内连接

  - 事实上内连接是表示左边的表和右边的表都有对应的数据关联：
    - 内连接在开发中偶尔也会常见使用
    - 内连接有其它的写法：**`CROSS JOIN`** 或者 **`JOIN`** 都可以；
    - 内连接，代表的是在**两张表连接时就会约束数据之间的关系，来决定之后查询的结果**；

  ```sql
  SELECT * FROM `products` JOIN `brand` ON products.brand_id = brand.id;
  ```

  

- 全连接

  - SQL 规范中全连接是使用 FULL JOIN ，但是MySQL中并没有对它的支持，我们需要使用 UNION 来实现；

  ```sql
  # 全连接一：将两张表中全部数据都查询出来
  (SELECT * FROM `products` LEFT JOIN `brand` ON products.brand_id = brand.id;)
  UNION
  (SELECT * FROM `products` RIGHT JOIN `brand` ON products.brand_id = brand.id;)
  
  # 全连接二：将两张表中不想交的部分查询出来
  (SELECT * FROM `products` LEFT JOIN `brand` ON products.brand_id = brand.id WHERE brand.id IS NULL;)
  UNION
  (SELECT * FROM `products` RIGHT JOIN `brand` ON products.brand_id = brand.id WHERE products.brand_id IS NULL;)
  ```

  

### 7.3、多对多数据

**students** 表：

| name  | age  |  id  |
| :---: | :--: | :--: |
| lily  |  18  |  1   |
|  why  |  18  |  2   |
| lilei |  18  |  3   |
|  wjw  |  20  |  4   |
|  zwz  |  23  |  5   |

**coures** 表：

| name | price |  id  |
| :--: | :---: | :--: |
| 语文 |  200  |  1   |
| 历史 |  300  |  2   |
| 地理 |  150  |  3   |
| 数学 |  100  |  4   |
| 英语 |  120  |  5   |
| 物理 |  100  |  6   |
| 化学 |  120  |  7   |
| 生物 |  100  |  8   |

**students_select_coures** 表：

| student_id | coures_id |  id  |
| :--------: | :-------: | :--: |
|     1      |     1     |  1   |
|     1      |     4     |  2   |
|     1      |     5     |  3   |
|     3      |     1     |  4   |
|     3      |     3     |  5   |
|     3      |     3     |  6   |
|     5      |     4     |  7   |



**查询：**

```sql
# 创建两张表之间的关系表
CREATE TABLE students_select_coures (
  id INT PRIMARY KEY AUTO_INCREMENT,
	student_id INT NOT NULL,
	coures_id INT NOT NULL,
	FOREIGN KEY (student_id) REFERENCES students(id) ON UPDATE CASCADE,
	FOREIGN KEY (coures_id) REFERENCES coures(id) ON UPDATE CASCADE
);

# 1.查询
# 1.1.查询所有有选课的学生，选择了哪些课程
# 思路：首先查询 students 表中与 students_select_coures 有关联/交集的数据（内连接），再用查询出的数据去查与 coures 表中有关联的数据
SELECT stu.id as stuId, stu.name as stuName, stu.age stuAge, cs.name csName, cs.id csId
FROM students AS stu 
JOIN students_select_coures ssc ON stu.id = ssc.student_id 
JOIN coures AS cs ON ssc.coures_id = cs.id;

# 1.2.查询所有的学生的选课情况
# 思路：要有所有的学生的情况，就要将 students 整张表都查出来（左连接），然后用查出来的表去和 coures 连接，并且不管有没有选课都要查出来（左连接）
SELECT stu.id as stuId, stu.name as stuName, stu.age stuAge, cs.name csName, cs.id csId
FROM students stu
LEFT JOIN students_select_coures ssc ON stu.id = ssc.student_id
LEFT JOIN coures cs ON ssc.student_id = cs.id;

# 1.3.查询哪些学生没有选课
# 思路：这次查询还是以学生为主，所以还是左连接，接下来和 coures 表去连接，将没有选课的筛选出来
SELECT stu.id as stuId, stu.name as stuName, stu.age stuAge, cs.name csName, cs.id csId
FROM students stu
LEFT JOIN students_select_coures scs ON stu.id = scs.student_id
LEFT JOIN coures cs ON scs.student_id = cs.id WHERE cs.id IS NULL;

# 1.4.查询哪些课程是没有被选择的
# 思路：此次查询的主体是课程，所以所有的课程信息（coures）都要被查询出来（右连接），再用联合查询出的数据去和学生表（students）做一次联合查询，将最后的数据筛选出来
SELECT stu.id as stuId, stu.name as stuName, stu.age stuAge, cs.name csName, cs.id csId
FROM students stu
RIGHT JOIN students_select_coures ssc ON stu.id = ssc.student_id
RIGHT JOIN coures cs ON ssc.coures_id = cs.id WHERE stu.id IS NULL;

# 1.5 查询某一个学生选了哪些课程
# 思路：当前查询还是以学生为主，所以所有的学生信息（students）都要查询出来（左连接），并通过 students_select_coures 的关联获取到 coures 表的相关信息，对最后查询出的数据做一个筛选
SELECT stu.id as stuId, stu.name as stuName, stu.age stuAge, cs.name csName, cs.id csId 
FROM students stu
LEFT JOIN students_select_coures ssc ON stu.id = ssc.student_id
LEFT JOIN coures cs ON ssc.coures_id = cs.id
WHERE stu.id = 4;

```



### 7.4、对象和数组类型

```sql
# 将联合查询的数据转成JSON（一对多）
SELECT 
  products.id id, products.title, title, products.price price,
	JSON_OBJECT('id', brand.id, 'name', brand.name, 'website', brand,website) as brand
FROM products
LEFT JOIN brand ON products.brand_id = brand.id; 


# 将查询到的多条数据，组织成对象，放到一个数组中（多对多）
SELECT 
  stu.id, stu.name, stu.age,
  JSON_ARRAYAGG(JSON_OBJECT('id', cs.id, 'name', cs.name, 'price', cs.price))
FROM students stu 
JOIN students_select_coures ssc ON stu.id = ssc.student_id
JOIN coures cs ON ssc.coures_id = cs.id
GROUP BY stu.id;

```













