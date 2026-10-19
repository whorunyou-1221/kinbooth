module.exports =  (sequelize, DataTypes) => {
    const SavedPhoto = sequelize.define("SavedPhoto",{
        SavedAt:{
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    });
    //associations
    SavedPhoto.associate = (models) => {
        SavedPhoto.belongsTo(models.User);
        SavedPhoto.belongsTo(models.Photo);
    };
    return SavedPhoto;
};