'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class talk extends Model {
        static associate(models) {
            models.talk.belongsTo(models.user, { foreignKey: 'userNum' });
        }
    }
    talk.init(
        {
            userNum: {
                type: DataTypes.INTEGER(8),
                comment: '유저번호',
            },
            talkString: {
                allowNull: false,
                type: DataTypes.TEXT,
                comment: '내용',
            },
        },
        {
            comment: '대화',
            sequelize,
            modelName: 'talk',
            freezeTableName: true, // 테이블명 복수형으로 만들지않기
        },
    );
    return talk;
};
