module.exports =  (sequelize, DataTypes) => {
    const PhotoSession = sequelize.define("PhotoSession",{
        SessionDate:{
            type:DataTypes.DATE,
            allowNull:false,
        },
    });
    //associations
        PhotoSession.associate = (models) => {
        PhotoSession.hasMany(models.Photo);
        PhotoSession.belongsTo(models.User);
        PhotoSession.belongsTo(models.Collage);
    };

    return PhotoSession;
};