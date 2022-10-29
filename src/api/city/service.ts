import { City } from '@prisma/client'

import prisma from '../../services/prisma'
import { CityWeather } from '../../types/city'

class Service {
	async getAll(): Promise<Array<City>> {
		return prisma.city.findMany()
	}

	async weather(cityId: number, date: string): Promise<CityWeather> {
		await prisma.city.update({ where: { id: cityId }, data: { requests: { increment: 1 } } })

		const today = new Date()

		const start = new Date(today.setUTCHours(0, 0, 0, 0))
		const end = new Date(today.setUTCHours(23, 0, 0, 0))

		switch (date) {
			case 'today':
				break
			case 'yesterday':
				start.setDate(start.getDate() - 1)
				end.setDate(end.getDate() - 1)
				break
			default:
				const customDate = new Date(date)
				start.setMonth(customDate.getMonth(), customDate.getDate())
				end.setMonth(customDate.getMonth(), customDate.getDate() + 1)
				break
		}

		const hourly = await prisma.weather.findMany({
			where: {
				cityId: {
					equals: cityId,
				},
				time: {
					gte: start,
					lte: end,
				},
			},
		})

		const avgTemp = +(
			hourly.reduce((accumulator, weather) => accumulator + weather.temperature, 0) / hourly.length
		).toFixed(1)
		const minTemp = Math.min(...hourly.map(({ temperature }) => temperature))
		const maxTemp = Math.max(...hourly.map(({ temperature }) => temperature))

		return { avgTemp, minTemp, maxTemp, hourly }
	}

	async averageTemp(cityId: number): Promise<number> {
		const { _avg } = await prisma.weather.aggregate({
			where: {
				cityId: {
					equals: cityId,
				},
			},
			_avg: {
				temperature: true,
			},
		})

		return +_avg.temperature.toFixed(1)
	}

	async topRequested(): Promise<City> {
		return prisma.city.findFirst({
			orderBy: {
				requests: 'desc',
			},
		})
	}
}

export default new Service()
