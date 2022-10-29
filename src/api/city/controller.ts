import { Request, Response, NextFunction } from 'express'

import { CityService } from './index'
import { success } from '../../services/response'

class Controller {
	list = (req: Request, res: Response, next: NextFunction) =>
		CityService.getAll().then(success(res, 200)).catch(next)

	getTopRequested = (req: Request, res: Response, next: NextFunction) =>
		CityService.topRequested().then(success(res, 200)).catch(next)

	getWeather = ({ params, query }: Request, res: Response, next: NextFunction) =>
		CityService.weather(parseInt(params.id), query.date).then(success(res, 200)).catch(next)

	getAverageTemp = ({ params }: Request, res: Response, next: NextFunction) =>
		CityService.averageTemp(parseInt(params.id)).then(success(res, 200)).catch(next)
}

export default new Controller()
