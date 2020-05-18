let Recados = (sequelize, Datatypes) => {
    let recados = sequelize.define(
        'Recados', 
        {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            titulo:{
                type: Datatypes.STRING, 
                allowNull: false
            },
            descricao:{
                type: Datatypes.STRING, 
                allowNull: false
            },
             data_criacao:{
                type: Datatypes.DATE,
                allowNull: false
            },
            id_classe:{
                type: Datatypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "Recados",
            timestamps: true
        }
    )

    Recados.associate = (models) => {
        Recados.belongsTo(
            models.Classes,
            {
                foreignKey: 'id_classes',
                as: 'classes'
            }
        );
    }

    return recados;

}

module.exports = Recados;