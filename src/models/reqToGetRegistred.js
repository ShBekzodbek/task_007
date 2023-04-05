module.exports = (sequelize, DataTypes) => {
    const Req = sequelize.define('req', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        text: {
            type: DataTypes.TEXT,
            maxLength: 500
        }
    });
    return Req;
}