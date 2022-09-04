import swaggerJSDoc from "swagger-jsdoc";
import dotenv from 'dotenv';
dotenv.config();
const swaggerDefinition={
    openapi:"3.0.3",
    info:{
        title:"Planilla documentations",
        version:"1.0.1",
    },
    servers:[
        {
            //produccion
            // url:`http://${process.env.SWAGGER_HOST}:4000`,
            //pruebas
            url:`http://${process.env.SWAGGER_HOST}:4000`
        },
        {
            //produccion
            // url:`http://${process.env.SWAGGER_HOST}:4000`,
            //pruebas
            url:`http://127.0.0.1:4000`
        }

    ],   
    components:{
        schemas:{
            signinUser:{
                type:"object",
                properties:{
                    userEmail:{
                        type:"string",
                        maxLength: 100
                    },
                    userDni:{
                        type:"string",
                        maxLength: 8
                    }
                }
            },
            signupUser:{
                type:"object",
                properties:{
                    userFirstName:{
                        type:"string",
                        maxLength: 30
                    },
                    userLastName:{
                        type:"string",
                        maxLength: 30
                    },
                    userEmail:{
                        type:"string",
                        maxLength: 100
                    },
                    userDni:{
                        type:"string",
                        maxLength: 8
                    },                   
                }
            },
            signinResponse:{
                type:"object",
                properties:{
                    token:{
                        type:"string"
                    },
                    userId:{
                        type:"integer"
                    },
                    userFirstName:{
                        type:"string"
                    },
                    userLastName:{
                        type:"string"
                    },
                    userEmail:{
                        type:"string"
                    },
                    userDni:{
                        type:"string"
                    },
                    userStatus:{
                        type:"integer"
                    },
                    userCreated:{
                        type:"string"
                    },
                    userUpdated:{
                        type:"string"
                    },
                }
            },
            addCategory:{
                type:"object",
                properties:{
                    employeeCategoryDescription:{
                        type:"string",
                        maxLength: 100
                    },
                    employeeCategoryShortDescription:{
                        type:"string",
                        maxLength: 10
                    },
                }
            },
            succesfulResponse:{
                type:"object",
                properties:{
                    msg:{
                        type:"string"
                    }
                }
            },
            errorResponse:{
                type:"object",
                properties:{
                    errorNo:{
                        type:"number"
                    },
                    errorMessage:{
                        type:"string"
                    }
                }
            },
            addCategorySalary:{
                type:"object",
                properties:{
                    categorySalarySalary:{
                        type:"number"
                    },
                    categorySalaryYear:{
                        type:"integer"
                    },
                    employeeCategoryId:{
                        type:"integer"
                    }
                }
            },
            addEmployee:{
                type:"object",
                properties:{
                    employeeDni:{
                        type:"string",
                        maxLength:8
                    },
                    employeeFullname:{
                        type:"string",
                        maxLength:100
                    },
                    categorySalaryId:{
                        type:"integer"
                    }
                }
            },
            updateEmployee:{
                type:"object",
                properties:{
                    employeeDni:{
                        type:"string",
                        maxLength:8
                    },
                    employeeFullname:{
                        type:"string",
                        maxLength:100
                    },
                    employeeStatus:{
                        type:"integer"
                    },
                    categorySalaryId:{
                        type:"integer"
                    },                    
                }
            },
            getEmployeesResponse:{
                type:"object",
                properties:{
                    countEmployees:{
                        type:"integer"
                    },
                    employees:{
                        type:"array",
                        items:{
                            type:"object",
                            properties:{                                
                                employeeDni:{
                                    type:"string",                                    
                                },
                                employeeFullname:{
                                    type:"string"
                                },
                                employeeStatus:{
                                    type:"integer"
                                },
                                categorySalaryId:{
                                    type:"integer"
                                }
                            }
                        }
                    }   
                }
            }

        },
        securitySchemes:{
            Authorization:{
                type:"http",
                scheme:"bearer"
            }
        }
    }
    
}

const options={
    swaggerDefinition,
    apis:[
        "./src/routes/*.ts"
    ] 
}
const openApiConfiguration=swaggerJSDoc(options);

export default openApiConfiguration;