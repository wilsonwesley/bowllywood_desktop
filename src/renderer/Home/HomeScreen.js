import { useState, useEffect } from 'react';
// import { Col, Row, Container } from 'react-bootstrap';
import { getCurrentUserDetails } from '../../services/users' ;
import ThinHeader from '../../components/ThinHeader';

function HomeScreen() {
	const [user, setUser] = useState({});

	// get user details for names 
	useEffect(()=>{
		getCurrentUserDetails().then((res)=>{
			setUser(res.data)
		}).catch((err)=>{
			console.log('HOME : GET USER DETAILS', err)
		})
	}, [user])

	// [ en attendant de pouvoir se connecter
	user.lastName = 'Jean';
	user.firstName = 'Hertat';
	const userFullname = `${user.lastName} ${user.firstName}`;
	// ]

	return (
		<div>
			<ThinHeader subTitle={userFullname} />
			<p>{userFullname}</p>
		</div>


		/*
		
		
		Container

		<ListItem title="" link="" description="" />
			Row
				Col xs={4}
					p fontSize={16} bold underline color="#3D3D3D"
				Col xs={6}
					p fontSize={16} bold underline color="#3D3D3D"
		
		<Navigation />

		*/


	);
}

export default HomeScreen;