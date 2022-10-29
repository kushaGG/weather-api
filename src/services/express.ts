import express, { Application, Router } from 'express'
import cors from 'cors'

import { morganMiddleware } from './logger'

export default (apiRoot: string, routes: Router) => {
	const app: Application = express()

	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	app.use(morganMiddleware)

	app.use(apiRoot, routes)

	app.get('/', async (req, res) => {
		return res.send('Weather Api')
	})

	app.use((err, req, res, next) => {
		console.log(`${new Date().toUTCString()} ${err.message}<======== ERROR`)

		if (err.stack) {
			delete err.stack
		}
		if (typeof err === 'string') {
			err = { message: err }
		}

		return res
			.status(err.status || err.statusCode || 500)
			.json({ success: false, message: err.message || err })
	})

	return app
}
