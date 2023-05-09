'use strict';
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    class User extends Model {}
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isAlpha:{
                    msg: "Please enter a first name with the valid characters [Aa-Za]",
                },               
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isAlpha:{
                    msg: "Please enter last name with the valid characters [Aa-Za]",
                },               
            },
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
            unique: {
                msg: "Email Address already exists. Please use a different email address",
            } 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { sequelize });


    User.associate = (models) => {
        //DB Associations
        User.hasMany(models.Course, {
            as: 'student', // allias
            foreignKey: {
                fieldName: 'userId',
                field: 'userId',
                allowNull: false,
            }
        });
    }

    return User;
};