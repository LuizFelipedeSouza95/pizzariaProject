import express, { json, Request, Response, NextFunction } from "express";
import 'express-async-errors'
import cors from 'cors';
import { router } from "./routes";
import path from 'path';

const PORT = process.env.PORT || 3003;
const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..','tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        // se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(PORT, async () => {
  console.info(`⚡️Server is running at http://localhost:${PORT}`);
});
