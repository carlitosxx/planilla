import { IntegerDataType } from "sequelize/types";
import internal from "stream";

// user model
export interface Iuser {
    userId?         :   number;   
    userFirstName?  :   string;
    userLastName?   :   string;
    userEmail?      :   string;
    userDni?        :   string;
    userStatus?     :   number;
    userCreated?    :   Date;
    userUpdated?    :   Date;
}