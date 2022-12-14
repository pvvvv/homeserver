'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            models.user.hasMany(models.talk, { foreignKey: 'userNum' });
        }
    }
    user.init(
        {
            userNum: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER(8),
                comment: '유저번호',
            },
            id: {
                allowNull: false,
                type: DataTypes.STRING(30),
                comment: '유저아이디',
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING(500),
                comment: '비밀번호',
            },
            nickname: {
                allowNull: false,
                type: DataTypes.STRING(20),
                comment: '별칭',
            },
            status: {
                allowNull: false,
                defaultValue: 1,
                type: DataTypes.INTEGER(1),
                comment: '상태',
            },
        },
        {
            comment: '유저',
            sequelize,
            modelName: 'user',
            freezeTableName: true, // 테이블명 복수형으로 만들지않기
        },
    );
    return user;
};
