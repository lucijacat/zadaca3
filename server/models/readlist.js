'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReadList extends Model {
    static associate(models) {
      ReadList.belongsTo(models.User, { foreignKey: 'userId' });
      ReadList.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }

  ReadList.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReadList',
  });

  return ReadList;
};
