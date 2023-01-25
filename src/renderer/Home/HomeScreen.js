import { useState, useEffect } from 'react';
import { Col, Row, Container, ListGroup } from 'react-bootstrap';
import { getCurrentUserDetails } from '../../services/users' ;
import ThinHeader from '../../components/ThinHeader';
import HomeListItem from '../../components/HomeListItem';

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
	

	const Navigation = () => {
		return (
			<Container fluid>
				<Row className="homeNavigation">
					<Col xs={2}>
						<div>
							{/*<FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />*/}
							{/*<i class="fa-solid fa-right-from-bracket"></i>*/}
							<p className="m-0">Tableau de bord</p>
						</div>
					</Col>
					<Col xs={2}>
						<div>
							{/*<FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />*/}
							<i class="fa-solid fa-right-from-bracket"></i>
							<p className="m-0">Profil</p>
						</div>
					</Col>
					<Col xs={2}>
						<div>
							{/*<FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />*/}
							<i class="fa-solid fa-right-from-bracket"></i>
							<p className="m-0">Déconnexion</p>
						</div>
					</Col>
				</Row>
			</Container>
		)
	}



	// className="border"

	return (
		<div className="border d-flex flex-column justify-content-between">	
			<ThinHeader subTitle={userFullname} />

			<ListGroup className="border container-fluid">
				{linkList.map((link)=>{
					return <HomeListItem title={link.title} isDisplayed={link.isDisplayed} description={link.description} />
				})}
			</ListGroup>

			<Navigation />

		</div>

		/*
		
			container
				row direction-row gaps-2
					col onClick
						{div d-flex
							logo
							text} boucle x3
		*/
	);
}

export default HomeScreen;