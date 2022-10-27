'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class comment extends Model {
        static associate(models) {
            models.comment.belongsTo(models.board, { foreignKey: 'boardNum' });
        }
    }
    comment.init(
        {
            commentNum: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER(8),
                comment: '유저번호',
            },
            boardNum: {
                type: DataTypes.INTEGER(8),
                comment: '게시글번호',
            },
            userNum: {
                type: DataTypes.INTEGER(8),
                comment: '유저번호',
            },
            content: {
                allowNull: false,
                type: DataTypes.TEXT,
                comment: '내용',
            },
            status: {
                allowNull: false,
                defaultValue: 1,
                type: DataTypes.INTEGER(1),
                comment: '상태',
            },
        },
        {
            comment: '댓글',
            sequelize,
            modelName: 'comment',
            freezeTableName: true, // 테이블명 복수형으로 만들지않기
        },
    );
    return comment;
};
