import { Weather } from '@prisma/client'

export interface CityWeather {
	avgTemp: number | null
	minTemp: number | null
	maxTemp: number | null
	hourly: Array<Weather>
}
