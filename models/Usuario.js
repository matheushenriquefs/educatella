let Usuario = (sequelize, Datatypes) => {
    let usuario = sequelize.define(
        'Usuario', 
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
            email:{
                type: Datatypes.STRING, 
                allowNull: false
            },
            senha:{
                type: Datatypes.STRING, 
                allowNull: false
            }
        },
        {
            tableName: "usuarios",
            timestamps: true
        }
    )

    usuario.associate = (models) => {

        usuario.hasOne(
            models.Aluno,
            {
                foreignKey: 'id_usuario',
                as: 'usuarioAluno'
            }
        );

        usuario.hasOne(
            models.Professor,
            {
                foreignKey: 'id_usuario',
                as: 'usuarioProfessor'
            }
        );
    }

    return usuario;

}

module.exports = Usuario;