let Tarefa = (sequelize, Datatypes) => {
    let tarefa = sequelize.define(
        'Tarefa', 
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
            arquivo:{
                type: Datatypes.STRING,
                allowNull: true
            },
            data_entrega:{
                type: Datatypes.STRING, 
                allowNull: false
            },
            id_classe:{
                type: Datatypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "tarefas",
            timestamps: true
        }
    )

    tarefa.associate = (models) => {
        tarefa.belongsTo(
            models.Classe,
            {
                foreignKey: 'id_classe',
                as: 'classe'
            }
        );

        tarefa.belongsToMany(
            models.Aluno,
            {
                foreignKey: 'id_tarefa',
                as: 'aluno',
                through: models.Tarefa_Aluno
            }
        );

        tarefa.hasMany(
            models.Tarefa_Aluno,
            {
                foreignKey: 'id_tarefa',
                as: 'tarefasAlunos'
            }
        );
    }

    return tarefa;

}

module.exports = Tarefa;