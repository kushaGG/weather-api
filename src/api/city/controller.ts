import { Request, Response, NextFunction } from 'express'

import { CityService } from './index'
import { success } from '../../services/response'

class Controller {
	list = (req: Request, res: Response, next: NextFunction) =>
		CityService.getAll().then(success(res, 200)).catch(next)
}

export default new Controller()
