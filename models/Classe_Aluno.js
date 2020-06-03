let Classe_Aluno = (sequelize, Datatypes) => {
    let classe_aluno = sequelize.define(
        'Classe_Aluno', 
        {
            id:{
                type: Datatypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            id_classe:{
                type: Datatypes.INTEGER,
                allowNull: false
            },
            id_aluno:{
                type: Datatypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "classes_alunos",
            timestamps: true
        }
    )

    return classe_aluno;





}






module.exports = Classe_Aluno;