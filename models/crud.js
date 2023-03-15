module.exports = (sequelize, DataTypes) => {
    const crud = sequelize.define("crud", {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return crud;
} 