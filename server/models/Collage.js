module.exports = (sequelize, DataTypes) => {
    const Collage = sequelize.define("Collage", {
        CollageName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PhotoCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        LayoutType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PreviewPath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Collage.associate = (models) => {
        Collage.hasMany(models.PhotoSession);
    };

    return Collage;
};
