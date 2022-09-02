import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition={
    openapi:"3.0.3",
    info:{
        title:"Planilla documentations",
        version:"1.0.1",
    },
    servers:[
        {
            url:"http://165.227.198.57:4000"}

    ],   
    components:{
        schemas:{
            signinUser:{
                type:"object",
                properties:{
                    userEmail:{
                        type:"string"
                    },
                    userDni:{
                        type:"string"
                    }
                }
            },
            signupUser:{
                type:"object",
                properties:{
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