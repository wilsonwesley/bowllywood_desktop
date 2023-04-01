import './HomeScreen.scss'
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { getCurrentUserDetails } from '../../services/users' ;
import ThinHeader from '../../components/ThinHeader';
import HomeListItem from '../../components/HomeListItem';
import IconNavigation from '../../components/IconNavigation';
import jwt_decode from "jwt-decode";

function HomeScreen() {
	const [userFullname, setUserFullname] = useState(''),
		[role, setRole] = useState('');

	let linkList = [],
	 	navList = [];

	// get user details for names 
	useEffect(()=>{
		const tokens = localStorage.getItem("userTokens"),
			userToken = jwt_decode(JSON.parse(tokens).token);
			setRole(userToken?.roleID)

		if (userToken?.roleID !== 'ROLE_USER')
		{
			getCurrentUserDetails(userToken?.id).then((res)=>{
				setUserFullname(`${res?.data?.data?.firstName ?? ''} ${res?.data?.data?.lastName ?? ''}`);
			})			
		}
	}, [])

	// set links
	const kitchenCalendar = {
		title: 'Agenda employés',
		isDisplayed: 'true',
		description: 'Afficher et gérer l’emploi du temps des cuisiniers et des serveurs.',
		route: '/kitchenCalendar'
	},
	reservations = {
		title: 'Réservations',
		isDisplayed: 'true',
		description: 'Consulter et gérer les réservations clients du restaurant.',
		route: '/reservations'
	},
	stocks = {
		title: 'Inventaire',
		isDisplayed: 'true',
		description: '[cuisiniers ET/OU chef cuisiniers] Informer un changement de stocks. Ajouter ou retirer.',
		route: '/stocks'
	},
	franchise = {
		title: 'Franchises',
		isDisplayed: 'true',
		description: 'Consulter et valider les demandes de franchises.',
		route: '/franchiseRequestsList'
	},
	profilIcon = {
		icon: 'fa-solid fa-user',
		text: 'Profil',
		route: '/profile'
	},
	deconnIcon = {
		icon: 'fa-solid fa-right-from-bracket',
		text: 'Déconnexion',
		route: '/'
	}

	if (role === 'ROLE_ADMIN' || role === 'ROLE_SUPERADMIN' || role === 'ROLE_CEO') {
		linkList = [kitchenCalendar, reservations, stocks, franchise]
		navList = [profilIcon, deconnIcon]
	}
	else if (role === 'ROLE_MANAGER' || role === 'ROLE_WAITER' || role === 'ROLE_COOK') {
		linkList = [kitchenCalendar, reservations, stocks] 
		navList = [profilIcon, deconnIcon]
	}
	else {
		navList = [deconnIcon]
	}

	return (
		<div className="homeScreen d-flex flex-column justify-content-between vh-100 px-5 py-4">	
			<ThinHeader subTitle={`Bonjour ${userFullname}`} />

			{
				(linkList.length !== 0)
				? <ListGroup className="homeListGroup container-fluid">
					{linkList.map((link, index)=>{
						return <HomeListItem key={index} title={link.title} isDisplayed={link.isDisplayed} description={link.description} route={link.route} index={index} />
					})}
				</ListGroup>
				: <p className="m-0 text-center">Il semblerait que vous n'ayez pas les droits pour accéder aux informations.</p>	
			}

			<IconNavigation iconArr={navList} />
		</div>
	);
}

export default HomeScreen;