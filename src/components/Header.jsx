import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = ({ search, setSearch }) => {
	return (
		<header>
			<h3>Music Player</h3>
			<div className="searchBox">
				<input
					type="text"
					placeholder="Search"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<FontAwesomeIcon icon={faSearch} />
			</div>
		</header>
	)
}

export default Header
