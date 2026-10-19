module.exports =  (sequelize, DataTypes) => {
    const Photo = sequelize.define("Photo",{
        FilePath:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    //associations
      Photo.associate = (models) => {
        Photo.hasMany(models.PhotoSticker);
        Photo.hasOne(models.SavedPhoto);
        Photo.belongsTo(models.Template);
        Photo.belongsTo(models.PhotoSession);
    };
    return Photo;
};