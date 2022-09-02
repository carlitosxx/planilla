import express,{Request,Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import openApiConfiguration from './docs/swagger'
import morgan from 'morgan';
import cors from 'cors';
import "dotenv/config";
import {connectDb} from './database';
import userRoute from './routes/user.routes';

const app = express();
const port= process.env.PORT;
//Config express 
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
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
// Route documentarion
app.use("/documentation",swaggerUi.serve,swaggerUi.setup(openApiConfiguration))
// Routes API
app.use(userRoute);
// Executing server and Connect to DB
app.listen(port,()=>{
console.log('listening on port: ',port)
connectDb();
});