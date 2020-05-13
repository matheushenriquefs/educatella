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
            data_entrega:{
                type: Datatypes.DATE,
                allowNull: false
            },
            data_criacao:{
                type: Datatypes.DATE,
                allowNull: false
            },
            nota:{
                type: Datatypes.INTEGER,
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
    }

    return tarefa;

}

module.exports = Tarefa;