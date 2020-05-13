let Classe = (sequelize, Datatypes) => {
    let classe = sequelize.define(
        'Classe', 
        {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            nome:{
                type: Datatypes.STRING, 
                allowNull: false
            },
            codigo:{
                type: Datatypes.STRING, 
                allowNull: false
            },
            id_professor:{
                type: Datatypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "classes",
            timestamps: true
        }
    )

    classe.associate = (models) => {
        classe.belongsTo(
            models.Professor,
            {
                foreignKey: 'id_professor',
                as: 'professor'
            }
        );

        classe.belongsToMany(
            models.Aluno,
            {
                foreignKey: 'id_aluno',
                as: 'aluno',
                through: models.Classe_Aluno
            }
        );

        classe.hasMany(
            models.Aviso,
            {
                foreignKey: 'id_classe',
                as: 'aviso'
            }
        );

        classe.hasMany(
            models.Tarefa,
            {
                foreignKey: 'id_classe',
                as: 'tarefa'
            }
        );

        classe.hasMany(
            models.Presenca,
            {
                foreignKey: 'id_classe',
                as: 'presenca'
            }
        );
    }

    return classe;

}

module.exports = Classe;