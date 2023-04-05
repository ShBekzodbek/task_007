module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                validateName: (name) => {
                    if (!name.match(/[a-z]ig/)) {
                        throw new Error(`Cannot  be used any characters`);
                    }
                }
            },
            minLength: 3,
            maxLength: 200,
            allowNull: false,
        },
        about: {
            type: DataTypes.STRING,
            minLength: 10,
            maxLength: 500
        }
        ,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            minLength: 9,
            maxLength: 50
        },
        status: {
            type: DataTypes.ENUM('user', 'admin', 'moderator'),
            defaultValue: 'user'
        },

    });
    return User;
}
