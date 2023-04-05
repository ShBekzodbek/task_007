module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('note', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        note: {
            type: DataTypes.TEXT,
            maxLength: 500,
            allowNull: false,
        }
    });
    return Note;
}