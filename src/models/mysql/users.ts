import sequelize from "../../config/mysql";
import {DataTypes} from "sequelize";
const employee =sequelize.sequelize.define(
    "usuario",
    {
        usuario_nombres:{
            type:DataTypes.STRING,
            allowNull:false
        },
        usuario_apellidos:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }
)