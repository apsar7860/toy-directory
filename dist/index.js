"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toyController_1 = __importDefault(require("./controllers/toyController"));
const userControllers_1 = __importDefault(require("./controllers/userControllers"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the Toy Directory API!');
});
// Use toy and user routers
app.use('/toys', toyController_1.default);
app.use('/users', userControllers_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
