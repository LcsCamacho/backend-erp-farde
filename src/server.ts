//imports
import express from 'express'
import cors from 'cors'
import { routerUser } from './routes/routerUser';
import { routerFuncionario } from './routes/routerFuncionario';

//app
const app = express();
app.use(cors());
app.use(express.json());
app.use(routerUser)
app.use(routerFuncionario)


//teste
app.listen(3777, () => {
    console.log('Server running on port 3777')
});