let Aviso = (sequelize, Datatypes) => {
    let aviso = sequelize.define(
        'Aviso', 
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
            tableName: "avisos",
            timestamps: true
        }
    )

    aviso.associate = (models) => {
        aviso.belongsTo(
            models.Classe,
            {
                foreignKey: 'id_classe',
                as: 'classe'
            }
        );
    }

    return aviso;

}

module.exports = Aviso;