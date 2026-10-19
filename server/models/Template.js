module.exports = (sequelize, DataTypes) => {
    const Template = sequelize.define("Template", {
        TemplateName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TemplatePath: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    //associations

     Template.associate = (models) => {
       Template.hasMany(models.Photo);
    };

    return Template;
};