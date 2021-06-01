import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentAlbum } from '../redux/currentAlbum';
import { AlbumCard, AllSongs } from './';

const SingleAlbum = () => {
	
	//instead of

	/*
	componentDidMount() {
		this.props.fetchCurrentAlbum(this.props.match.params.id);
	}
	*/
	const { id } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentAlbum(id));
	}, []);

	const currentAlbum = useSelector(state => state.currentAlbum);

	return (
		<div id='single-album' className='column'>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<AlbumCard album={currentAlbum} />
				<Link to='/'>
					<div className='backBtn'>{'<< Back To All Albums'}</div>
				</Link>
			</div>
			<AllSongs songs={currentAlbum.songs} />
		</div>
	);
};

export default SingleAlbum;
