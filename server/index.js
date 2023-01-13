import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import router from './router/router.js'

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);

function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Сервер заупщен на порту: PORT`)
        })
    } catch (err) {
        console.error(err)
    }
}
start()