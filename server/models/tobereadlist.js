'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ToBeReadList extends Model {
    static associate(models) {
      ToBeReadList.belongsTo(models.User, { foreignKey: 'userId' });
      ToBeReadList.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }

  ToBeReadList.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToBeReadList',
  });

  return ToBeReadList;
};
