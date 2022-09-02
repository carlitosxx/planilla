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
    // paths:{
    //     "/user/signin/{userEmail}/{userDni}":{
    //         get:{
    //             summary:"Descripcion de usuario",
    //             parameters:{
    //                 name:"userEmail"
    //             }
    //         }
    //     }
    // },
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