const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete','root','La242119@',{
    dialect:'mysql',
    host: 'localhost'
});
module.exports =sequelize;