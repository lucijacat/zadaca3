'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }

  Review.init({
    comment: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });

  return Review;
};
