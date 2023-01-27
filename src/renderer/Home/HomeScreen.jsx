/*
Icon vert qd on est sur la page en question
*/

import './HomeScreen.scss'
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { getCurrentUserDetails } from '../../services/users' ;
import ThinHeader from '../../components/ThinHeader';
import HomeListItem from '../../components/HomeListItem';
import IconNavigation from '../../components/IconNavigation';

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

	const linkList = [
		{
			title: 'Planning employés',
			isDisplayed: 'true',
			description: 'Afficher et gérer l’emploi du temps des cuisiniers et des serveurs.'
		},
		{
			title: 'Les réservations',
			isDisplayed: 'true',
			description: 'Consulter et gérer les réservations clients du restaurant.'
		},
		{
			title: 'Les stocks',
			isDisplayed: 'true',
			description: '[cuisiniers ET/OU chef cuisiniers] Informer un changement de stocks. Ajouter ou retirer.'
		},
		{
			title: 'Franchises',
			isDisplayed: 'true',
			description: '[PDG] Consulter et valider les demandes de franchises.'
		},
		{
			title: 'Restaurants',
			isDisplayed: 'true',
			description: '[PDG] Consulter les restaurants'
		}
	]

	const navList = [
	{
		icon: 'fa-solid fa-house',
		text: 'Accueil',
		route: ''
	},
	{
		icon: 'fa-solid fa-user',
		text: 'Profil',
		route: ''
	},
	{
		icon: 'fa-solid fa-right-from-bracket',
		text: 'Déconnexion',
		route: ''
	},
	]

	return (
		<div className="homeScreen d-flex flex-column justify-content-between vh-100 px-5 py-4">	
			<ThinHeader subTitle={userFullname} />

			<ListGroup className="homeListGroup container-fluid">
				{linkList.map((link, index)=>{
					return <HomeListItem title={link.title} isDisplayed={link.isDisplayed} description={link.description} index={index} />
				})}
			</ListGroup>

			<IconNavigation iconArr={navList} />

		</div>
	);
}

export default HomeScreen;