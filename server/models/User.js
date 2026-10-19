module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            alloNull: false,
        },
        password: {
            type: DataTypes.STRING,
            alloNull: false,
        },
    });

    //associations
    User.associate = (models) => {
        User.hasMany(models.SavedPhoto);
        User.hasMany(models.PhotoSession);
    };

    return User;
};
