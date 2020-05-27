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
    }

    return aluno;

}

module.exports = Aluno;