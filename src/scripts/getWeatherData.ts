import { City } from '@prisma/client'

import prisma from '../services/prisma'
import WeatherAPI from '../services/weatherAPI'

const WeatherCodeMap = new Map([
	[0, 'Clear sky'],
	[1, 'Mainly clear, partly cloudy, and overcast'],
	[2, 'Mainly clear, partly cloudy, and overcast'],
	[3, 'Mainly clear, partly cloudy, and overcast'],
	[45, 'Fog and depositing rime fog'],
	[48, 'Fog and depositing rime fog'],
	[51, 'Drizzle: Light, moderate, and dense intensity'],
	[53, 'Drizzle: Light, moderate, and dense intensity'],
	[55, 'Drizzle: Light, moderate, and dense intensity'],
	[56, 'Freezing Drizzle: Light and dense intensity'],
	[57, 'Freezing Drizzle: Light and dense intensity'],
	[61, 'Rain: Slight, moderate and heavy intensity'],
	[63, 'Rain: Slight, moderate and heavy intensity'],
	[65, 'Rain: Slight, moderate and heavy intensity'],
	[66, 'Freezing Rain: Light and heavy intensity'],
	[67, 'Freezing Rain: Light and heavy intensity'],
	[71, 'Snow fall: Slight, moderate, and heavy intensity'],
	[73, 'Snow fall: Slight, moderate, and heavy intensity'],
	[75, 'Snow fall: Slight, moderate, and heavy intensity'],
	[77, 'Snow grains'],
	[80, 'Rain showers: Slight, moderate, and violent'],
	[81, 'Rain showers: Slight, moderate, and violent'],
	[82, 'Rain showers: Slight, moderate, and violent'],
	[85, 'Snow showers slight and heavy'],
	[86, 'Snow showers slight and heavy'],
	[95, 'Thunderstorm: Slight or moderate'],
	[96, 'Thunderstorm with slight and heavy hail'],
	[99, 'Thunderstorm with slight and heavy hail'],
])

const getWeatherData = async () => {
	const cities: Array<City> = await prisma.city.findMany()

	await Promise.all(
		cities.map(async (city) => {
			const weather = await WeatherAPI.getLastWeather(city.lat, city.lon)

			const weatherApi = weather.hourly.time.map((time, index) => ({
				cityId: city.id,
				time: new Date(time),
				temperature: weather.hourly.temperature_2m[index],
				weather: WeatherCodeMap.get(weather.hourly.weathercode[index]),
			}))

			const weatherEntities = await prisma.weather.findMany({
				where: {
					cityId: {
						equals: city.id,
					},
				},
			})

			const data = weatherApi.filter(
				({ time, cityId }) =>
					!weatherEntities.some(
						({ time: time2, cityId: cityId2 }) =>
							time.toString() === time2.toString() && cityId === cityId2,
					),
			)

			const { count } = await prisma.weather.createMany({ data })

			console.log(`Created ${count} objects for city: ${city.title}`)
		}),
	)
}

getWeatherData()
