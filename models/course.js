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
            allowNull: false,
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allownNull: true,

        }, 
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: false,
        },  
    

    }, {sequelize});
    
    //DB Associations
    Course.associate = (models) => {
        Course.belongsTo( models.User, {
            as: 'student', // allias
            foreignKey:{
                fieldName: 'userId',
                allowNull: false,
            }
        });
    };

    return Course;
};