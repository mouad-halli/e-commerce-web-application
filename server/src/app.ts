import express, { NextFunction, Request, Response } from 'express'
import { CLIENT_URL, PORT } from './config/environment'
import cors from 'cors'
import { STATUS_CODES } from 'http'
import { connectToDatabase } from './config/database'
import userRoute from './routes/users.routes'

const { INTERNAL_SERVER_ERROR } = STATUS_CODES

const app = express()

app.use(cors({
	origin: CLIENT_URL,
	credentials: true
}))

app.use(express.json())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json('Hello World')
})

app.use('/user', userRoute)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	const errorStatus = error.status || 500
	const errorMessage = error.message || INTERNAL_SERVER_ERROR

	return res.status(errorStatus).json({
		message: errorMessage,
	})
})

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`)
	connectToDatabase()
})