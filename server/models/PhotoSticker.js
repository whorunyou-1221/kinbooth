module.exports = (sequelize, DataTypes) => {
    const PhotoSticker = sequelize.define("PhotoSticker", {
        PositionX: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PositionY: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Scale: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Notation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    PhotoSticker.associate = (models) => {
        PhotoSticker.belongsTo(models.Sticker);
        PhotoSticker.belongsTo(models.Photo);
    };

    return PhotoSticker;
};
