const {DataTypes} = require("sequelize");

const sequelize = require("../util/database");

const Comment = sequelize.define("comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        }
    }
}); 

module.exports = Comment;