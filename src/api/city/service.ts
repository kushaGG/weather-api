import { City } from '@prisma/client'

import prisma from '../../services/prisma'

class Service {
	async getAll(): Promise<Array<City>> {
		return prisma.city.findMany()
	}
}

export default new Service()
