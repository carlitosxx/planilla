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
};
export interface Iemployee{
    employeeId          :   number,
    employeeDni         :   string,
    employeeFullname    :   string,
    employeeStatus      :   number,
    employeeEntryDate   :   Date,
    employeeCUSPP       :   string,
    employeeAIRHSP      :   string,
    categorySalary      :   IcategorySalary,
    typeEmployee        :   ItypeEmployee,
    pensionAdministrator:   IpensionAdministrator,
    condition           :   Icondition,
    laborRegime         :   IlaborRegime
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
export interface IlaborRegime{
    laborRegimeId           :   number,
    laborRegimeCode         :   string,
    laborRegimeName         :   string,
    laborRegimeDescription  :   string
}
export interface IoccupationalGroup{
    occupationalGroupId             :   number,
    occupationalGroupCode           :   string,
    occupationalGroupName           :   string,
    occupationalGroupDescription    :   string,
}
export interface Iestablishment{
    establishmentId                 :   number,
    establishmentCode               :   string,
    establishmentName               :   string,
    establishmentDescription        :   string,
}
export interface Iposition{
    positionId                      :   number,
    positionCode                    :   string,
    positionName                    :   string,
    positionDescription             :   string,
}
export interface Iworkday{
    workdayId                       :   number,
    workdayHoursDay                 :   number,
    workdayDaysWeek                 :   number,
    workdayDescription              :   string
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
        const laborRegime:IlaborRegime={
            laborRegimeId       :   element.laborRegimeId,
            laborRegimeCode     :   element.laborRegimeCode,
            laborRegimeName     :   element.laborRegimeName,
            laborRegimeDescription: element.laborRegimeDescription
        }
        const occupationalGroup:IoccupationalGroup={
            occupationalGroupId             :   element.occupationalGroupId,
            occupationalGroupCode           :   element.occupationalGroupCode,
            occupationalGroupName           :   element.occupationalGroupName,
            occupationalGroupDescription    :   element.occupationalGroupDescription
        }
        const establishment:Iestablishment={
            establishmentId                 :   element.establishmentId,
            establishmentCode               :   element.establishmentCode,
            establishmentName               :   element.establishmentName,
            establishmentDescription        :   element.establishmentDescription
        }
        const position:Iposition={
            positionId                      :   element.positionId,    
            positionCode                    :   element.positionCode,
            positionName                    :   element.positionName,
            positionDescription             :   element.positionDescription
        }
        const workday:Iworkday={
            workdayId                       :   element.workdayId,
            workdayHoursDay                 :   element.workdayHoursDay,
            workdayDaysWeek                 :   element.workdayDaysWeek,
            workdayDescription              :   element.workdayDescription
        }
        return {
            employeeId:element.employeeId,
            employeeDni:element.employeeDni,
            employeeFullname:element.employeeFullname,
            employeeStatus:element.employeeStatus,
            employeeEntryDate:element.employeeEntryDate,
            employeeCUSPP:element.employeeCUSPP,                 
            employeeAIRHSP:element.employeeAIRHSP,
            categorySalary,
            typeEmployee,
            pensionAdministrator,
            condition,
            laborRegime,
            occupationalGroup,
            establishment,
            position,
            workday
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