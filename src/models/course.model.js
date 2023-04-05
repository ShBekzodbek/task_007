module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('course', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            minLength: 3,
            maxLength: 200,
            allowNull: false,
        },
        about: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tags:
        {
            type: DataTypes.ARRAY(DataTypes.STRING),
            maxLength: 50
        }
        ,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    });

    return Course;
}
