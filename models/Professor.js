let Professor = (sequelize, Datatypes) => {
    let professor = sequelize.define(
        'Professor', 
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
            tableName: "professores",
            timestamps: true
        }
    )

    professor.associate = (models) => {
        professor.belongsTo(
            models.Usuario,
            {
                foreignKey: 'id_usuario',
                as: 'usuario'
            }
        ),
        professor.hasMany(
            models.Classe,
            {
                foreignKey: 'id_professor',
                as: 'classe'
            }
        );
    }

    return professor;

}

module.exports = Professor;