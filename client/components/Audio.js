import React, { useRef, useEffect } from "react";
//not conntecting anymore
//useDispatch needed for hook
import { useDispatch } from "react-redux";
import { updateTrackTime, setAudioRef } from "../redux/audio";
import { formatTime, setAudioSrc, playAudio, pauseAudio } from "./audioHelpers";

// click handler for audio playback/pause, used by PlayPauseBtn, SingleSong
export const handlePlayerBtnClick = (audioRef, newSrc) => {
  if (!audioRef.current.src || audioRef.current.src !== newSrc) {
    setAudioSrc(audioRef, newSrc);
  }
  audioRef.current.paused ? playAudio(audioRef) : pauseAudio(audioRef);
};

//class Audio became function
const Audio = () => {
  /* 
	constructor(props) {
		super(props);
		this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
		this.audioRef = React.createRef(null);
	}

	componentDidMount() {
		this.props.setAudioRef(this.audioRef);
	}
*/
  // no more props mounting...

  //what is useRef??
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  //what is useEffect?  -> it tells React that component needs to do something after render.
  //React will remember the fuction you passed and call after performing DOM updates
  //instead of mapDispatch
  useEffect(() => {
    dispatch(setAudioRef(audioRef));
  }, []);

  const handleTimeUpdate = () => {
    const currentPosition = formatTime(
      Math.floor(audioRef.current.currentTime)
    );
    const totalTime = formatTime(Math.floor(audioRef.current.duration));

    // if-check guards against NaN:NaN totalTime before song has loaded
    if (!isNaN(audioRef.current.duration)) {
      dispatch(updateTrackTime(`${currentPosition} / ${totalTime}`));
    }
  };

  // bind onTimeUpdate event listener that will provide
  // current place and total time, ex. 1:45 / 3:30
  return <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />;
};

export default Audio;


/*
const mapDispatch = dispatch => ({
	setAudioRef: ref => dispatch(setAudioRef(ref)),
	updateTrackTime: timeString => dispatch(updateTrackTime(timeString)),
});

export default connect(null, mapDispatch)(Audio);

*/