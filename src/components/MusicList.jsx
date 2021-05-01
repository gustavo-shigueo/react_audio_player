import classes from './css/MusicList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const MusicList = ({ songsList, setSongIndex, songIndex, search }) => {
	return (
		<ul className={classes.musicList}>
			{
				songsList && songsList.map((song, index) => (
					song.split('/').reverse()[0].toLowerCase().match(search.toLowerCase())
						?	(
								<li
									key={index}
									className={`${classes.musicItem} ${index === songIndex ? classes.active : ''}`}
									onClick={() => setSongIndex(index)}
								>
									<div className={classes.icon}>
										<FontAwesomeIcon
											icon={faMusic}
										/>
									</div>
									{song.split('/').reverse()[0]}
								</li>
							)
						: ''
				))}
		</ul>
	)
}

export default MusicList
