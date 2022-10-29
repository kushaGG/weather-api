import axios from 'axios'
import { WeatherResponse } from '../types/weatherAPI'

class WeatherAPI {
	private readonly axiosInstance = axios.create({
		baseURL: 'https://api.open-meteo.com/v1',
	})

	getLastWeather = (latitude, longitude): Promise<WeatherResponse> =>
		this.axiosInstance('/dwd-icon', {
			params: {
				latitude,
				longitude,
				hourly: 'temperature_2m,weathercode',
				start_date: this.getStartDate(),
				end_date: this.getEndDate(),
			},
		})
			.then(({ data }) => data)
			.catch((err) => console.log(err))

	private getStartDate() {
		const date = new Date()
		date.setDate(date.getDate() - 7)
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	}

	private getEndDate() {
		const date = new Date()
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	}
}

export default new WeatherAPI()
