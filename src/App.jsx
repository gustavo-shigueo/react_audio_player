import './App.css'
import { Header, MusicList, Player } from './components'
import { useEffect, useState } from 'react'

function App() {
	const [songsList, setSongsList] = useState([])

  const [search, setSearch] = useState('')
  
	const [song, setSong] = useState('')
	const [songIndex, setSongIndex] = useState(0)

  useEffect(() => {
    if (songsList.length > 0) return
    const getSongs = async () => {
      const PORT = 8080
      const URL  = `http://localhost:${PORT}/`
      const response = await fetch(URL)
      const json = await response.json()
      return json
    }
    getSongs().then(data => {
      setSongsList(data.sort().map(item => `./audio/${item.split('/').reverse()[0]}`))
      setSong(songsList[songIndex])
    })
  }, [songIndex, songsList])

	useEffect(() => {
		if (songsList == null || songIndex == null) return
		setSong(songsList[songIndex])
	}, [songsList, songIndex])

	return (
		<>
			<Header search={search} setSearch={setSearch} />
			{
        songsList.length > 0 && song
          ? <>
            <MusicList
              songsList={songsList}
              setSongIndex={setSongIndex}
              songIndex={songIndex}
              search={search}
            />
            <Player
              song={song}
              songIndex={songIndex}
              setSongIndex={setSongIndex}
              length={songsList.length}
            />
          </>
          : ''
      }
		</>
	)
}

export default App
