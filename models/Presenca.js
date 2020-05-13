let Presenca = (sequelize, Datatypes) => {
    let presenca = sequelize.define(
        'Presenca', 
        {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            presenca:{
                type: Datatypes.STRING, 
                allowNull: false
            },
            data:{
                type: Datatypes.DATE,
                allowNull: false
            },
            id_classe:{
                type: Datatypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "presencas",
            timestamps: true
        }
    )

    presenca.associate = (models) => {
        presenca.belongsTo(
            models.Classe,
            {
                foreignKey: 'id_classe',
                as: 'classe'
            }
        );
    }

    return presenca;

}

module.exports = Presenca;