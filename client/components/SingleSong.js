import React from 'react';
import { useSelector } from 'react-redux';
import PlayPauseBtn from './PlayPauseBtn';


//instead of being class and
//istead of...
/*
	const { song, currentSong, isPaused, trackNumber } = this.props;

	the function is taking {trackNumber, song}

	how??? because of useSelector??
*/
const SingleSong = ({ trackNumber, song }) => {
	const currentSong = useSelector(state => state.currentSong);
	const isPaused = useSelector(state => state.audio.isPaused);

	const { name, artist, genre } = song;

	const isSelected = !currentSong.id || currentSong.id === song.id;

	// pass down status of audio somehow here?
	const isActiveSong = isSelected && !isPaused;

	return (
		<tr className={isActiveSong ? 'active' : ''}>
			<td>
				{/* song prop used to compare against currentSong and conditionally render single song play/pause btn icons */}
				<PlayPauseBtn song={song} />
			</td>
			<td>{trackNumber}</td>
			<td>{name}</td>
			<td>{artist.name}</td>
			<td>{genre}</td>
		</tr>
	);
};

export default SingleSong;
