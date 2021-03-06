let Aluno = (sequelize, Datatypes) => {
    let aluno = sequelize.define(
        'Aluno', 
        {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            id_usuario:{
                type: Datatypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "alunos",
            timestamps: true
        }
    )

    aluno.associate = (models) => {
        aluno.belongsTo(
            models.Usuario,
            {
                foreignKey: 'id_usuario',
                as: 'usuarioAluno'
            }
        );

        aluno.belongsToMany(
            models.Classe,
            {
                foreignKey: 'id_aluno',
                as: 'classes',
                through: models.Classe_Aluno
            }
        );

        aluno.belongsToMany(
            models.Tarefa,
            {
                foreignKey: 'id_aluno',
                as: 'tarefas',
                through: models.Tarefa_Aluno
            }
        );

        aluno.hasMany(
            models.Tarefa_Aluno,
            {
                foreignKey: 'id_aluno',
                as: 'tarefasAlunos'
            }
        );
    }

    return aluno;

}

module.exports = Aluno;