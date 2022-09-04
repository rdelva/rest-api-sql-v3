'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Model {}
    Course.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,           
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        description: {
            type: DataTypes.TEXT,
            estimatedTime: DataTypes.STRING,
            allowNull: false,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: false,
        },  

    }, {sequelize});
    
    //DB Associations
    Course.associate = (models) => {
        Course.belongsTo( models.User, {
            as: 'user', // allias
            foreignKey:{
                fieldName: 'userId',
                allowNull: false,
            }
        });
    };

    return Course;
};