import express,{Request,Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import openApiConfiguration from './docs/swagger'
import morgan from 'morgan';
import cors from 'cors';
import "dotenv/config";
import {connectDb} from './database';
import userRoute from './routes/user.routes';
import employeeRoute from './routes/employee.routes';
import entityRoute from './routes/entity.routes';
import financingRoute from './routes/financing.routes';
import budgetGoal from './routes/budgetGoal.routes';
import responsibleRoute from './routes/responsible.routes';
const app = express();
const port= process.env.PORT;
//Config express 
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use("/storage",express.static(__dirname + "/storage"));
app.use(express.urlencoded({ extended:false}));
// Json body validation 
app.use(function (error: any, req: any, res: any, next: () => void) {
    if (error instanceof SyntaxError) {
        res.status(400).json([{
            msg:'Invalid Json body',
            code:400,
            param:'body'}])
    } else {
      next();          
    }
});
// Route documentation
app.use("/documentation",swaggerUi.serve,swaggerUi.setup(openApiConfiguration))
// Routes API
app.use(userRoute);
app.use(employeeRoute);
app.use(entityRoute);
app.use(financingRoute);
app.use(budgetGoal);
app.use(responsibleRoute);
// Executing server and Connect to DB
app.listen(port,()=>{
console.log('listening on port: ',port)
connectDb();
});