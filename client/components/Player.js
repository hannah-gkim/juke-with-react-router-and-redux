import React from 'react';
//no more connect but...
//useSelector and useDispatch
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../redux/currentSong';
import { setPaused } from '../redux/audio';
import { handlePlayerBtnClick } from './Audio';
import PlayPauseBtn from './PlayPauseBtn';

// btn classNames
const backIcon = 'fa fa-step-backward';
const forwardIcon = 'fa fa-step-forward';

//originally was inside  class?
// functions for song navigation
const setPreviousSong = (currentAlbum, currentSong, audioRef, dispatch) => {
	if (!currentAlbum.songs) return;

	let previousIndex =
		currentAlbum.songs.findIndex(song => song.id === currentSong.id) - 1;

	if (previousIndex < 0) {
		previousIndex = currentAlbum.songs.length - 1;
	}

	const previousSong = currentAlbum.songs[previousIndex];

	//instead of
	/*
	this.props.setCurrentSong(previousSong);
		handlePlayerBtnClick(audioRef, previousSong.audioUrl);
		this.props.setPaused(audioRef.paused);
	*/
	dispatch(setCurrentSong(previousSong));
	handlePlayerBtnClick(audioRef, previousSong.audioUrl);
	dispatch(setPaused(audioRef.paused));
};

const setNextSong = (currentAlbum, currentSong, audioRef, dispatch) => {
	if (!currentAlbum.songs) return;

	let nextIndex =
		currentAlbum.songs.findIndex(song => song.id === currentSong.id) + 1;

	if (nextIndex === currentAlbum.songs.length) {
		nextIndex = 0;
	}

	const nextSong = currentAlbum.songs[nextIndex];

	dispatch(setCurrentSong(nextSong));
	handlePlayerBtnClick(audioRef, nextSong.audioUrl);
	dispatch(setPaused(audioRef.paused));
};

//instead of class, use function
const Player = () => {

	//instead of
	//	const { currentAlbum, currentSong, audioRef, trackTime } = this.props;

	const audioRef = useSelector(state => state.audio.audioRef);
	const trackTime = useSelector(state => state.audio.trackTime);
	const currentAlbum = useSelector(state => state.currentAlbum);
	const currentSong = useSelector(state => state.currentSong);
	const dispatch = useDispatch();

	return (
		<div id='player-container'>
			<div id='player-controls'>
				<div id='current-album'>
					<img src={currentAlbum.artworkUrl} />
					<span>
						{currentAlbum.name}
						{currentAlbum.name && ' | '}
						{currentAlbum.artist && currentAlbum.artist.name}
					</span>
				</div>
				<div className='row center'>
					<i
						className={backIcon}
						onClick={() =>
							setPreviousSong(currentAlbum, currentSong, audioRef, dispatch)
						}
					/>
					{/* play/pause btn requires a song prop, which is used to conditionally render the btn icon -- by passing currentSong here, we are asserting that this play/pause btn will always be the active one for any play/pause action */}
					<PlayPauseBtn song={currentSong} />
					<i
						className={forwardIcon}
						onClick={() =>
							setNextSong(currentAlbum, currentSong, audioRef, dispatch)
						}
					/>
				</div>
				{/* audioRef's onTimeUpdate event handler makes trackTime available on the redux store's audio object */}
				<div id='track-name-and-time'>
					{/* only show song name once track has loaded */}
					<span id='track-name'>{trackTime ? currentSong.name : ''}</span>
					<span id='track-time'>{trackTime}</span>
				</div>
			</div>
		</div>
	);
};

export default Player;

/*
const mapState = state => ({
	audioRef: state.audio.audioRef,
	trackTime: state.audio.trackTime,
	currentAlbum: state.currentAlbum,
	currentSong: state.currentSong,
});

const mapDispatch = dispatch => ({
	setCurrentSong: song => dispatch(setCurrentSong(song)),
	setPaused: status => dispatch(setPaused(status)),
});

export default connect(mapState, mapDispatch)(Player);

*/