import { Router } from 'express'

import CityService from './service'
import Controller from './controller'

const router = Router()

router.get('/', Controller.list)

export { CityService }
export default router
