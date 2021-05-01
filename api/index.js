const http = require('http')
const fs = require('fs')
const MUSIC_FOLDERS = ['../public/audio']

http
	.createServer((_, res) => {
		const songs = []
		try {
			// Looks for songs in whatever directories you add to MUSIC_FOLDERS
			MUSIC_FOLDERS.forEach(folder => {
				fs.readdirSync(folder).forEach(file => songs.push(`${folder}/${file}`))
			})
		} catch (e) {
			console.log(e)
		}
		const body = songs

		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET')
		res.write(JSON.stringify(body))
		res.end()
	})
	.listen(8080)
