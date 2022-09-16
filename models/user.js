'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            //models.user.hasMany(models.scheduler, { foreignKey: 'id' });
            // define association here
        }
    }
    user.init(
        {
            num: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER(8),
                comment: '유저번호',
            },
            id: {
                allowNull: true,
                type: DataTypes.STRING(30),
                comment: '유저아이디',
            },
            password: {
                allowNull: true,
                type: DataTypes.STRING,
                comment: '비밀번호',
            },
            name: {
                allowNull: true,
                type: DataTypes.STRING(30),
                comment: '유저이름',
            },
            birthday: {
                allowNull: true,
                type: DataTypes.STRING(30),
                comment: '생년월일',
            },
        },
        {
            sequelize,
            modelName: 'user',
            freezeTableName: true, // 테이블명 복수형으로 만들지않기
        },
    );
    return user;
};
