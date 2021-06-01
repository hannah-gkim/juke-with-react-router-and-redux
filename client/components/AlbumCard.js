import React from "react";

//when {state} ?? is added as parameter, it can call state?... use??
//where is this album coming from??
//---> album is coming from AllAlbums.js  from its useSelector
const AlbumCard = ({ album }) => {
  // console.log("albums", album);
  const { name, artworkUrl, artist } = album;
  const { artistName } = artist || "";

  return (
    <div className="album">
      <img src={artworkUrl} />
      <p>{name}</p>
      <small>{artistName}</small>
    </div>
  );
};

export default AlbumCard;
