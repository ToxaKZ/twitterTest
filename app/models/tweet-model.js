const Sequelize      = require('sequelize');
module.exports = function(sequelize){
    return sequelize.define('tweet', {
        id_str: Sequelize.STRING,
        userName: Sequelize.STRING,
        userImage: Sequelize.STRING,
        createDate: Sequelize.DATE,
        text: Sequelize.STRING,
        starredDate: Sequelize.DATE
    });
}