const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const useModel = (tableName) => {

    const Register = sequelize.define(tableName, {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        register: { type: DataTypes.ARRAY(DataTypes.JSON) },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, {
        hooks: {
            beforeCreate: function (register, options) {
                register.createdAt = new Date();
                register.updatedAt = new Date();
            },
            beforeUpdate: function (register, options) {
                register.updatedAt = new Date();
            },
        },
    });


    return {
        Register
    }
}

module.exports = useModel;
