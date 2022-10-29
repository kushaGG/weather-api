import { Router } from 'express'

import cities from './city'

const router = Router()

router.use('/cities', cities)

export default router
