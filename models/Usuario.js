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

    return usuario;

}

module.exports = Usuario;