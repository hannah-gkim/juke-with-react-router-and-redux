import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { setPaused } from '../redux/audio';
import { handlePlayerBtnClick } from './Audio';

const playIcon = 'fa fa-play-circle';
const pauseIcon = 'fa fa-pause-circle';

//{song} coming from SingleSong.js
//when using class, handleClick had to be binded
const PlayPauseBtn = ({ song }) => {
	const audioRef = useSelector(state => state.audio.audioRef);
	const currentSong = useSelector(state => state.currentSong);
	const isPaused = useSelector(state => state.audio.isPaused);

	//like mapToDispatch
	const dispatch = useDispatch();
	//when using class, it would have been under mapDispatch
	const updateCurrentSong = thisSong => dispatch(setCurrentSong(thisSong));

	const handleClick = () => {
		dispatch(setPaused(song.id === currentSong.id && !isPaused));
		updateCurrentSong(song);
		handlePlayerBtnClick(audioRef, song.audioUrl);
	};

	return (
		<i
			className={song.id === currentSong.id && !isPaused ? pauseIcon : playIcon}
			onClick={handleClick}
		/>
	);
};

export default PlayPauseBtn;
