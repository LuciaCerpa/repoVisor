const mongoose = require('../config/db.js');

const useModel = (tableName) => {
    const registerSchema = new mongoose.Schema({
      register: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Json' }],
        required: true,
      },
    });
  
    registerSchema.pre('save', function (next) {
      this.createdAt = new Date();
      this.updatedAt = new Date();
      next();
    });
  
    registerSchema.pre('update', function (next) {
      this.updatedAt = new Date();
      next();
    });
  
    const Register = mongoose.model(tableName, registerSchema);
  
    return Register;
  };
  
  module.exports = useModel;
//const { DataTypes, Sequelize } = require('sequelize');
//const sequelize = require('../config/db');

//const useModel = (tableName) => {

//     const Register = sequelize.define(tableName, {
//         id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//         register: { type: DataTypes.ARRAY(DataTypes.JSON) },
//         createdAt: Sequelize.DATE,
//         updatedAt: Sequelize.DATE
//     }, {
//         hooks: {
//             beforeCreate: function (register, options) {
//                 register.createdAt = new Date();
//                 register.updatedAt = new Date();
//             },
//             beforeUpdate: function (register, options) {
//                 register.updatedAt = new Date();
//             },
//         },
//     });


//     return {
//         Register
//     }
// }

// module.exports = useModel;
