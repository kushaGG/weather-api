export interface HourlyUnits {
	time: string
	temperature_2m: string
	weathercode: string
}

export interface Hourly {
	time: any[]
	temperature_2m: any[]
	weathercode: number[]
}

export interface WeatherResponse {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	hourly_units: HourlyUnits
	hourly: Hourly
}
