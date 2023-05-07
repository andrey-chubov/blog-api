import mongoose from 'mongoose';
import config from './config';
import express from "express";
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from "cors";
import fileUpload from 'express-fileupload'
import router from './routes';
import { checkError } from './middlewares/error.middelware';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger/openapi.json'


const app = express();

app.use(cors({
	credentials: true,
	origin: config.hostClient
}));
const staticDir = path.join(__dirname, 'public')
app.use(express.static(staticDir))

app.use(fileUpload({
	limits: {
		fileSize: 1000000
	},
	abortOnLimit: true,
	responseOnLimit: 'Файл слишком большой (не более 1 МБ)'
}))

app.use(cookieParser())
app.use(express.json())
app.use("/", router);
app.use(checkError);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


const startApp = async () => {
	try {
		await mongoose.connect(config.host);
		app.listen(config.port, () =>
			console.log("SERVER STARTED ON PORT: " + config.port)
		);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

startApp();