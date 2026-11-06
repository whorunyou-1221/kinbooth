module.exports = (sequelize, DataTypes) => {
    const Sticker = sequelize.define("Sticker", {
        StickerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        StickerPath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Sticker.associate = (models) => {
        Sticker.hasMany(models.PhotoSticker);
    };

    return Sticker;
};
