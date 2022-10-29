import { Router } from 'express'

import CityService from './service'
import Controller from './controller'

const router = Router()

router.get('/', Controller.list)

router.get('/top-requested', Controller.getTopRequested)

router.get('/:id/weather', Controller.getWeather)

router.get('/:id/avg-temp', Controller.getAverageTemp)

export { CityService }
export default router
