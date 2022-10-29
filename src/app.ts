import http from 'http'
import figlet from 'figlet'
import { PrismaClient } from '@prisma/client'

import api from './api/index'
import express from './services/express'
import { Logger } from './services/logger'

const app = express('/api', api)
const server = http.createServer(app)
const prisma = new PrismaClient()

setImmediate(() => {
	server.listen(process.env.PORT, async () => {
		Logger.info(`Express server listening on http://localhost:${process.env.PORT} `)

		await prisma.$connect()

		figlet('Weather Server', { horizontalLayout: 'fitted' }, (err, data) =>
			err ? Logger.error(err) : console.log(data),
		)
	})
})
