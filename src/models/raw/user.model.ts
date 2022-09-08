import { HostNotReachableError, IntegerDataType } from "sequelize/types";
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
export interface Iemployee{
    employeeId          :   number,
    employeeDni         :   string,
    employeeFullname    :   string,
    employeeStatus      :   number,
    enmployeeEntryDate  :   Date,
    categorySalary      :   IcategorySalary,
    typeEmployee        :   ItypeEmployee,
    pensionAdministrator:   IpensionAdministrator,
    condition           :   Icondition
};

export interface IcategorySalary{
    categorySalaryId    :   number,
    categorySalarySalary:   number,
    categorySalaryYear  :   number,
    employeeCategory: IemployeeCategory
};
export interface ItypeEmployee{
    typeEmployeeId      :   number,
    typeEmployeeDescription:string
};
export interface IemployeeCategory{
    employeeCategoryId          :   number,
    employeeCategoryDescription :   string,
    employeeCategoryShortDescription:string,    
};
export interface IpensionAdministrator{
    pensionAdministratorId      :   number ,
    pensionAdministratorCode    :   string ,
    pensionAdministratorDescription: string,
    pensionSystem:IpensionSystem
};
export interface IpensionSystem{
    pensionSystemId             : number,
    pensionSystemCode           : string,
    pensionSystemDescription    : string
}
export interface Icondition{
    conditionId                 : number,
    conditionCode               : string,
    conditionName               : string,
    conditionDescription        : string
}


export const jsonToEmployee=(object:any):Iemployee=>{
    return object.map(
        (element:any)=>{
        const employeeCategory:IemployeeCategory={
            employeeCategoryId              :   element.employeeCategoryId,
            employeeCategoryDescription     :   element.employeeCategoryDescription,
            employeeCategoryShortDescription:   element.employeeCategoryShortDescription, 
        }    
        const categorySalary:IcategorySalary={
            categorySalaryId    :   element.categorySalaryId,
            categorySalarySalary:   element.categorySalarySalary,
            categorySalaryYear  :   element.categorySalaryYear,
            employeeCategory
        }
        const typeEmployee:ItypeEmployee={
            typeEmployeeId:element.typeEmployeeId,
            typeEmployeeDescription:element.typeEmployeeDescription
        }
        const pensionSystem:IpensionSystem={
            pensionSystemId             : element.pensionSystemId,
            pensionSystemCode           : element.pensionSystemCode,
            pensionSystemDescription    : element.pensionSystemDescription
        }        
        const pensionAdministrator:IpensionAdministrator={
            pensionAdministratorId:element.pensionAdministratorId,
            pensionAdministratorCode:element.pensionAdministratorCode,
            pensionAdministratorDescription:element.pensionAdministratorDescription,
            pensionSystem

        }
        const condition:Icondition={
            conditionId                 : element.conditionId,
            conditionCode               : element.conditionCode,
            conditionName               : element.conditionName,
            conditionDescription        : element.conditionDescription
        }
        return {
            employeeId:element.employeeId,
            employeeDni:element.employeeDni,
            employeeFullname:element.employeeFullname,
            employeeStatus:element.employeeStatus,
            enmployeeEntryDate:element.employeeEntryDate,
            categorySalary,
            typeEmployee,            
            pensionAdministrator,
            condition
        }
    }
    )
    
}

export const jsonToCategorySalary=(object:any):IcategorySalary=>{
    return object.map((element:any)=>{
        const employeeCategory:IemployeeCategory={
            employeeCategoryId          :   element.employeeCategoryId,
            employeeCategoryDescription :   element.employeeCategoryDescription,
            employeeCategoryShortDescription:element.employeeCategoryShortDescription,  
        }
        return {
            categorySalaryId    :   element.categorySalaryId,
            categorySalarySalary:   element.categorySalaryId,
            categorySalaryYear  :   element.categorySalaryYear,
            employeeCategory
        }
    })
}

export const jsonToPensionAdministrator=(object:any):IpensionAdministrator=>{
    return object.map((element:any)=>{
        const pensionSystem:IpensionSystem={
            pensionSystemId             : element.pensionSystemId,
            pensionSystemCode           : element.pensionSystemCode,
            pensionSystemDescription    : element.pensionSystemDescription
        }
        return {
            pensionAdministratorId      :   element.pensionAdministratorId ,
            pensionAdministratorCode    :   element.pensionAdministratorCode ,
            pensionAdministratorDescription: element.pensionAdministratorDescription,
            pensionSystem
        }
    })
}