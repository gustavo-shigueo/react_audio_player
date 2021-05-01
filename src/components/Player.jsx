import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPlay,
	faPause,
	faForward,
	faBackward,
	faRandom,
	faVolumeMute,
} from '@fortawesome/free-solid-svg-icons'
import classes from './css/Player.module.css'
import disk from '../img/img.png'
import { useCallback, useEffect, useRef, useState } from 'react'

const Player = ({ song, setSongIndex, songIndex, length }) => {
	const audio = useRef()
	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (!song || !audio.current) return
    isPlaying && audio.current.play().catch(e => e)
	}, [song, isPlaying])

	const updateProgress = e => {
		if (!e.target) return
		const { duration, currentTime } = e.target
		setProgress(currentTime / duration)
    if (progress === 1) changeSong(1)
	}

  const setCurrentTime = e => {
		const width = e.target.clientWidth
		const click = e.nativeEvent.offsetX
		const { duration } = audio.current
		audio.current.currentTime = (click / width) * duration
	}

  const playPause = useCallback(() => setIsPlaying(!isPlaying), [isPlaying])
  useEffect(() => isPlaying ? audio.current.play().catch(e => e) : audio.current.pause(), [isPlaying])

	const secondsToMinutes = s => {
		const min = Math.floor(s / 60)
		const sec = Math.floor((s / 60 - Math.floor(s / 60)) * 60)
		return `${min}:${sec >= 10 ? sec : `0${sec}`}`
	}

  const changeSong = useCallback(dir => {
    setSongIndex(songIndex + dir)
    setProgress(0)
    if (songIndex < 1 && dir === -1) setSongIndex(length - 1)
    if (songIndex > length - 2 && dir === 1) setSongIndex(0)
  }, [length, setSongIndex, songIndex])

  useEffect(() => {
    if (progress !== 1) return
    changeSong(1)
    setProgress(0)
  }, [changeSong, progress])

  const randomSong = () => setSongIndex(Math.floor(Math.random() * length))

  const handleKey = useCallback(e => {
		if (document.activeElement.tagName === 'INPUT' && document.hasFocus()) return
		if (e.key === 'F12') return
		e.preventDefault()
		switch (e.key.toLowerCase()) {
			case ' ':
			case 'k':
				playPause()
				break
			case 'arrowright':
				audio.current.currentTime += 5
				break
			case 'arrowleft':
				audio.current.currentTime -= 5
				break
			case 'l':
				audio.current.currentTime += 10
				break
			case 'j':
				audio.current.currentTime -= 10
				break
			case 'n':
				changeSong(1)
				break
      default:
        const n = Number(e.key)
        if (isNaN(n) || !Number.isInteger(n) || n >= 10 || n < 0) break
        audio.current.currentTime = n / 10 * audio.current.duration
		}
	}, [changeSong, playPause])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

	return (
		<div
			className={`${classes.playerContainer} ${isPlaying ? classes.play : ''}`}
		>
			<audio src={song} ref={audio} onTimeUpdate={updateProgress} muted={muted} />
			<div className={classes.musicInfo}>
				<div className={classes.textContainer}>
					<h4 className={classes.title}>{song.split('/').reverse()[0]}</h4>
					<h4 className={classes.timestamp}>
						{audio.current
							? `${secondsToMinutes(audio.current.currentTime || 0)} / ${secondsToMinutes(audio.current.duration || 0)}`
							: ''}
					</h4>
				</div>

				<div className={classes.progressContainer} onClick={setCurrentTime}>
					<div
						className={classes.progress}
						style={{ transform: `scaleX(${progress})` }}
					/>
				</div>

				<div className={classes.imgContainer}>
					<img
						src={disk}
						alt="Music disk"
						type="image/png"
						className={classes.img}
					/>
				</div>
			</div>

			<div className={classes.controls}>
				<div className={classes.navigation}>
					<button className={classes.btn} onClick={() => randomSong()}>
						<FontAwesomeIcon icon={faRandom} />
					</button>
					<button className={classes.btn} onClick={() => audio.current.currentTime <= 5 ? changeSong(-1) : audio.current.currentTime = 0}>
						<FontAwesomeIcon icon={faBackward} />
					</button>
					<button
						className={`${classes.btn} ${classes.big}`}
						onClick={playPause}
					>
						<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
					</button>
					<button className={classes.btn} onClick={() => changeSong(1)}>
						<FontAwesomeIcon icon={faForward} />
					</button>
					<button className={classes.btn} onClick={() => setMuted(!muted)}>
						<FontAwesomeIcon icon={faVolumeMute} style={{ color: muted ? 'var(--color-accent-1)' : '' }} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Player
