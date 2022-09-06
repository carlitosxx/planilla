CREATE DATABASE planilla;
use planilla;
/*TABLES*/
CREATE TABLE tbl_user(
    userId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userFirstName VARCHAR(30),
    userLastName VARCHAR(30),
    userEmail VARCHAR(100),
    userDni VARCHAR(8),
    userStatus  TINYINT NOT NULL,
    userCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userUpdated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `userEmail_UNIQUE`(`userEmail`)    
);
CREATE TABLE tbl_employee_category(
    employeeCategoryId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    employeeCategoryDescription VARCHAR(100) NOT NULL,
    employeeCategoryShortDescription VARCHAR(10) NOT NULL,
    UNIQUE KEY `employeeCategoryShortDescription_UNIQUE`(`employeeCategoryShortDescription`),
    
);
CREATE TABLE tbl_category_salary(
    categorySalaryId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    categorySalarySalary DECIMAL(10,2) NOT NULL,
    categorySalaryYear  INT NOT NULL,
    employeeCategoryId INT NOT NULL,
    FOREIGN KEY (employeeCategoryId) REFERENCES tbl_employee_category(employeeCategoryId)     
);
CREATE TABLE tbl_employee(
    employeeId INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    employeeDni VARCHAR(8) NOT NULL,
    employeeFullname varchar(100) NOT NULL,
    employeeStatus TINYINT NOT NULL,        
    categorySalaryId INT NOT NULL,
    UNIQUE KEY `employeeDni_UNIQUE`(`employeeDni`), 
    FOREIGN KEY (categorySalaryId) REFERENCES tbl_category_salary(categorySalaryId) 
);
CREATE TABLE tbl_pension_system(
  pensionSystemId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  pensionSystemCode VARCHAR (10) NOT NULL,
  pensionSystemDescription VARCHAR(50) NOT NULL
);


/*STORED PROCEDURES*/
DELIMITER $$
CREATE PROCEDURE `sp_insert_categorySalary`(in P_categorySalaryYear INT,in P_employeeCategoryId INT,in P_categorySalarySalary DECIMAL(10,2))
BEGIN
INSERT INTO tbl_category_salary( 
	categorySalarySalary,
    categorySalaryYear,
    employeeCategoryId)
SELECT 
	P_categorySalarySalary,
    P_categorySalaryYear,
    P_employeeCategoryId
WHERE NOT EXISTS (	SELECT * 
					FROM tbl_category_salary 
					WHERE 
						categorySalaryYear=P_categorySalaryYear and 
						employeeCategoryId=P_employeeCategoryId 
					LIMIT 1);
END$$
DELIMITER ;

DELIMITER $$
USE `planilla`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_employeesByPageSize`(in Ppage int, in Psize int)
BEGIN
	SET @pag= (Ppage-1)*Psize;    
		SET @qry_string=concat("
SELECT 
	A.employeeId,
	A.employeeDni,
	A.employeeFullname,
    A.employeeStatus,
	B.categorySalaryId,
	B.categorySalarySalary,
    B.categorySalaryYear,
    C.employeeCategoryId,
    C.employeeCategoryDescription,
    C.employeeCategoryShortDescription
FROM 
	tbl_employee A inner join tbl_category_salary B 
on 
	A.categorySalaryId=B.categorySalaryId
inner join tbl_employee_category C
on 
	C.employeeCategoryId=B.employeeCategoryId
order by A.employeeFullname limit ",@pag,",",Psize);
	prepare qry from @qry_string;
	execute qry;
END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_get_categoryByPageSize`(in Ppage int, in Psize int)
BEGIN
	SET @pag= (Ppage-1)*Psize;    
	SET @qry_string=concat("SELECT * FROM tbl_employee_category order by employeeCategoryShortDescription limit ",@pag,",",Psize);
	prepare qry from @qry_string;
	execute qry;
END$$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `sp_get_salaryByPageSize`(in Ppage int, in Psize int)
BEGIN
	SET @pag= (Ppage-1)*Psize;    
	SET @qry_string=concat("SELECT 
	A.categorySalaryId,
	A.categorySalarySalary,
	A.categorySalaryYear,
    B.employeeCategoryId,
	B.employeeCategoryDescription,
	B.employeeCategoryShortDescription	 
FROM 
	tbl_category_salary A inner join tbl_employee_category B 
on A.employeeCategoryId=B.employeeCategoryId 
order by categorySalaryYear desc limit ",@pag,",",Psize);
	prepare qry from @qry_string;
	execute qry;
END$$

DELIMITER ;