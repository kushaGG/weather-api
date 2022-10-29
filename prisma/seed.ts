import prisma from '../src/services/prisma'

const load = async () => {
	try {
		await prisma.city.deleteMany()
		console.log('Deleted records in city table')

		await prisma.city.createMany({
			data: [
				{
					title: 'Vienna',
					lon: 16.37208,
					lat: 48.208488,
				},
				{
					title: 'Brussels',
					lon: 4.34878,
					lat: 50.850449,
				},
				{
					title: 'Sofia',
					lon: 23.32415,
					lat: 42.69751,
				},
				{
					title: 'Zagreb',
					lon: 15.97798,
					lat: 45.814442,
				},
				{
					title: 'Nicosia',
					lon: 33.366669,
					lat: 35.166672,
				},
				{
					title: 'Prague',
					lon: 14.42076,
					lat: 50.088039,
				},
				{
					title: 'Copenhagen',
					lon: 12.56553,
					lat: 55.675941,
				},
				{
					title: 'Tallinn',
					lon: 24.73823,
					lat: 59.471691,
				},
				{
					title: 'Helsinki',
					lon: 24.93417,
					lat: 60.17556,
				},
				{
					title: 'Paris',
					lon: 2.34864,
					lat: 48.85339,
				},
				{
					title: 'Berlin',
					lon: 10.45,
					lat: 54.033329,
				},
				{
					title: 'Athens',
					lon: 23.716221,
					lat: 37.97945,
				},
				{
					title: 'Budapest',
					lon: 19.08333,
					lat: 47.5,
				},
				{
					title: 'Dublin',
					lon: -6.26719,
					lat: 53.34399,
				},
				{
					title: 'Rome',
					lon: 12.4839,
					lat: 41.894741,
				},
				{
					title: 'Riga',
					lon: 24.1,
					lat: 56.950001,
				},
				{
					title: 'Vilnius',
					lon: 25.2798,
					lat: 54.689159,
				},
				{
					title: 'Luxembourg',
					lon: 6.13333,
					lat: 49.599998,
				},
				{
					title: 'Valletta',
					lon: 14.51472,
					lat: 35.899719,
				},
				{
					title: 'Amsterdam',
					lon: 4.88969,
					lat: 52.374031,
				},
				{
					title: 'Warsaw',
					lon: 21.01178,
					lat: 52.229771,
				},
				{
					title: 'Lisbon',
					lon: -9.13333,
					lat: 38.716671,
				},
				{
					title: 'Bucharest',
					lon: 26.10626,
					lat: 44.432251,
				},
				{
					title: 'Bratislava',
					lon: 17.106741,
					lat: 48.148159,
				},
				{
					title: 'Ljubljana',
					lon: 14.50513,
					lat: 46.051079,
				},
				{
					title: 'Madrid',
					lon: -3.70256,
					lat: 40.4165,
				},
				{
					title: 'Stockholm',
					lon: 18.064899,
					lat: 59.332581,
				},
			],
		})
		console.log('Added city data')
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

load()
