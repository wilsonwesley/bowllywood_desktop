import './reservation.scss';
import { useState, useEffect } from 'react';
import { getAllReservations } from '../../services/reservation';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ThinHeader from '../../components/ThinHeader';
import ReservationListStat from '../../components/ReservationListStat';
import LoadingSpinner from '../../components/LoadingSpinner';
import useErrorHandler from '../../conf/ErrorHandler';

let dateObj, resDate, resTime;
function ReservationList () {

	const [reservations, setReservations] = useState([]),
		  [sortIcon, setSortIcon] = useState('up'),
		  [isError, setIsError] = useState(false),
		  [isLoaded, setIsLoaded] = useState(false);

	const handleError = useErrorHandler('TOAST', 'err.code', `Liste des réservations : {err.message}`)
	useEffect(()=>{
		
		getAllReservations().then((res)=>{
			// place items depending of the date
			// descendent mode
			res.data.sort((first, second)=>{
				return (first.reservDate < second.reservDate) ? 1 : -1;
			})
			setReservations(res.data)
			
		}).catch((err)=>{
			// console.log('GET ALL RESERV : ', err)
			setIsError(true)
			handleError('TOAST', err.code, `Liste des réservations : ${err.message}`)
		}).finally(()=>{
			setIsLoaded(true)
		})
	}, [])
		
	const sortList = () => {
		let newIcon = (sortIcon === 'down') ? 'up' : 'down';
		setSortIcon(newIcon)

		reservations.sort((first, second)=>{
			return -1;
		});
	}

	const getFullDate = (dateObj) =>
	{
		if (typeof dateObj != 'object') {
			dateObj = new Date(dateObj);
		}

		return dateObj.toLocaleDateString("fr-FR", 
		{
			year: 'numeric',
	    	month: 'long',
	    	day: 'numeric'
		});
	}

	const getFullTime = (dateObj) =>
	{
		if (typeof dateObj != 'object') {
			dateObj = new Date(dateObj);
		}

		let minutes = dateObj.getMinutes();
		return `${dateObj.getHours()}h${ (minutes !== 0) ? minutes : ''}`;
	}

	const formatStatus = (statusCode) => {
		let status, statusColor;
		switch (statusCode) {
			// kept
			case 'KEPT':
				status = 'Maintenu';
				statusColor = 'positiveColor';
				break;
			// cancelled
			case 'CLD':
				status = 'Annulé';
				statusColor = 'negativeColor';
				break;
			// closed
			case 'CLS':
				status = 'Terminé';
				statusColor = 'warningColor';
				break;
			default:
				status = 'Indéfini';
				statusColor = '';
		}
		return {status, statusColor};
	}

	// Get the first day of the week
	var currDate;
	if (!currDate) 
	{
		// Get current day number, converting Sunday to 7
		currDate = new Date();
		let day = currDate.getDay() || 7;

		// calculate the number of hours to subtract from the current day
		if( day !== 1 ) {
			currDate.setHours(-24 * (day - 1));
		}
		currDate = getFullDate(currDate, 'DATS');
	}

	const ReservationsRender = () => {
		if (reservations.length > 0)
		{
			return (reservations.map((reserv) => {
				let {status, statusColor} = formatStatus(reserv.status);

				dateObj = reserv.reservDate;
				if (dateObj.includes('Z')) {
					dateObj = dateObj.split('Z')[0];
				}
				resDate = getFullDate(dateObj);
				resTime = getFullTime(dateObj);

				return (
				<ListGroupItem key={reserv._id} action={true} active={true} href={`/reservations/${reserv._id}`} className="resListItem px-0">
					<Row className="d-flex justify-content-between m-0 pt-2 w-100">
						<Col className="p-0">
							<span className="mediumText">{reserv.seatNr} Personnes</span>
							<p>{reserv.reservName}</p>
						</Col>
						<Col md={7} xl={5} className="p-0">
							<p>
								{resDate}
								<span className="mediumText mx-2"> à </span>
								{resTime}
							</p>
							<span className={/*mediumText*/` ${statusColor}`}>{status}</span>
						</Col>
					</Row>
				</ListGroupItem>
				)
			})
			)
		}
		else
		{
			// devrait être remplacé par la gestion des erreurs.
			return(
				<div className="d-flex align-items-center justify-content-center">
					<span>Aucune réservation n'a été trouvée.</span>
				</div>
			)
		}
	}

	return (
	<div className="resCtnr d-flex flex-column px-5 py-4">

		<ThinHeader subTitle="Gérer les réservations" />
		
		<Row className="resStatistic justify-content-center" >
			<ReservationListStat number="12" title="Tables disponibles" subNumber="6" subTitle="tables réservées" />
			<ReservationListStat number="49" title="Places restantes" subNumber="23" subTitle="Places réservées" />
			<ReservationListStat number="67" title="Occupation de la salle" isPercent="true"/>
		</Row>

		<Row className="resListContent">
			<Col>
				<Row className="mb-3 align-items-center">
					<p className="d-inline">Liste des réservations</p>
					<span className=" mx-2"> – </span> 
					<span>semaine du {currDate}</span>
				</Row>
				<Row className="flex-column-reverse flex-md-row justify-content-between px-4" >
					<Col md={8} xxl={7} className="resList">
						<div className="d-flex justify-content-end mb-3">
							{/*<div>
								<i className="fa-solid fa-grip mr-3"onClick={}></i>
								<i className="fa-solid fa-bars-staggered"onClick={}></i>
							</div>*/}
							<i className={`fa-solid fa-arrow-${sortIcon}`} onClick={sortList}></i>
						</div>

						<ListGroup className="pl-5">
						{
							(isLoaded)
							? <ReservationsRender />
							: <div className="d-flex align-items-center justify-content-center">
								<LoadingSpinner />
								<span className="ml-3">Chargement des réservations</span>
							  </div>

						}
						</ListGroup>
					</Col>
					<Col md={3} xxl={3}>
						<Link to="/reservations/form" className="d-flex flex-column justify-content-center align-items-center">
							<i className="addIcon fa-solid fa-plus mb-3"></i>
							<p className="addText text-center">Ajouter une réservation</p>
						</Link>
					</Col>
				</Row>
			</Col>
		</Row>
		{/* <SimplePopup /> */}
	</div>
	)
}

export default ReservationList;
// <Button bsType="button" onClick={() => { Popup.onClose() /*.close()*/ }} >Ok pour moi !</Button>