let Recado = (sequelize, Datatypes) => {
    let recado = sequelize.define(
        'Recado', 
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
            tableName: "recados",
            timestamps: true
        }
    )

    recado.associate = (models) => {
        recado.belongsTo(
            models.Classe,
            {
                foreignKey: 'id_classe',
                as: 'classe'
            }
        );
    }

    return recado;

}

module.exports = Recado;