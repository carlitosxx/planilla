"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./docs/swagger"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const database_1 = require("./database");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT;
//Config express 
app.get('/favicon.ico', (req, res) => res.status(204));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Json body validation 
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(400).json([{
                msg: 'Invalid Json body',
                code: 400,
                param: 'body'
            }]);
    }
    else {
        next();
    }
});
// Route documentarion
app.use("/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Routes API
app.use(user_routes_1.default);
app.use(employee_routes_1.default);
// Executing server and Connect to DB
app.listen(port, () => {
    console.log('listening on port: ', port);
    (0, database_1.connectDb)();
});
//# sourceMappingURL=index.js.map