//imported to use hooks
import React, { useEffect } from "react";
//imported to use hooks
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAlbums } from "../redux/albums";
import { AlbumCard } from "./";
//import { connect } from 'react-redux';
// we no longer use conncet

//changed from class to function
const AllAlbums = () => {
  //no more componentDidMount
  /*
	componentDidMount() {
		this.props.loadAlbums();
	}
	*/
  //instead dispatch using hook useDispatch
  //useDispatch is fuction enables to dispatch any action to the store by adding an action as argument
  const dispatch = useDispatch();

  //what is useEffect?  -> it tells React that component needs to do something after render.
  //React will remember the fuction you passed and call after performing DOM updates
  //instead of mapDispatch
  useEffect(() => {
    dispatch(fetchAlbums());
  }, []); //<- dependency array? triggers re-renders based on what's held inside it.  with an empty dependency array we are telling react hey please treat this effect like componentDidMount

  //what is useSelector? --> is a func that takes current state as argument and return data you want to form it
  //it is like mapStateToPros
  //this is instead of   mapState
  const albums = useSelector((state) => {
    //console.log("state-->", state);
    return state.albums;
  });

  //not using class, no need to render, just return
  return (
    <div id="albums" className="row wrap">
      {albums.map((album) => (
        <Link key={album.id} to={`/albums/${album.id}`}>
          <AlbumCard album={album} />
        </Link>
      ))}
    </div>
  );
};

/*
const mapState = state => ({
	albums: state.albums,
});

const mapDispatch = dispatch => ({
	loadAlbums: () => dispatch(fetchAlbums()),
});

*/

export default AllAlbums;

//so we won't be connecting
//connect(mapState, mapDispatch)(AllAlbums);
