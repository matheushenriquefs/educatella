let Tarefa_Aluno = (sequelize, Datatypes) => {
    let tarefa_aluno = sequelize.define(
        'Tarefa_Aluno', 
        {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            id_tarefa:{
                type: Datatypes.INTEGER,
                allowNull: false
            },
            id_aluno:{
                type: Datatypes.INTEGER,
                allowNull: false
            },
            arquivo:{
                type: Datatypes.STRING,
                allowNull: false
            },
            nota:{
                type: Datatypes.INTEGER,
                allowNull: true
            }
        },
        {
            tableName: "tarefas_alunos",
            timestamps: true
        }
    )

    tarefa_aluno.associate = (models) => {

        tarefa_aluno.belongsTo(
            models.Tarefa, 
            {
                foreignKey: 'id_tarefa',
                as: 'tarefa'
            }
        );

        tarefa_aluno.belongsTo(
            models.Aluno, 
            {
                foreignKey: 'id_aluno',
                as: 'aluno'
            }
        );
    }

    return tarefa_aluno;

}

module.exports = Tarefa_Aluno;