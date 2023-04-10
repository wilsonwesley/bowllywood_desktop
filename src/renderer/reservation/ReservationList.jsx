// data
import { useState, useEffect } from 'react';
import { getAllReservations } from '../../services/reservation';
// component
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ThinHeader from '../../components/ThinHeader';
import ReservationListStat from '../../components/ReservationListStat';
import LoadingSpinner from '../../components/LoadingSpinner';
// date
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/fr_FR'
// utils
import {errorHandler} from '../../utils/errorHandler';
import './reservation.scss';
 
function ReservationList () {

	const [reservations, setReservations] = useState([]),
		  [cancel, setCancel] = useState(false),
		  [rotate, setRotate] = useState(false),
		  [sortIcon, setSortIcon] = useState('up'),
		  [seatNumber, setSeatNumber] = useState(0),
		  [selectedDate, setSelectedDate] = useState(new Date()),
		  [fullDate, setFullDate] = useState(''),
		  [capacity/*, setCapacity*/] = useState(40),
		  [openedHours/*, setOpenedHours*/] = useState(12),
		  [seatsPerDay, setSeatsPerDay] = useState(12),
		  [refreshData, setRefreshData] = useState(false),
		  [isLoaded, setIsLoaded] = useState(false);

	let today = dayjs().format('YYYY-MM-DD');

	useEffect(()=>{
		setCancel(false)

		let filterDate = dayjs(selectedDate).format('YYYY-MM-DD')
		setFullDate(filterDate)
		getAllReservations(filterDate).then((res)=>{
			if (cancel) return;
			// place items depending of the date
			// descendent mode
			res.data.sort((first, second)=>{
				return (first.reservDate < second.reservDate) ? 1 : -1;
			})

			let allSeatNumber = 0;
			res.data.forEach((item)=>{
				let dateObj = item.reservDate;
				if (dateObj.includes('Z')) {
					dateObj = dateObj.split('Z')[0];
				}
				item.resDate = getFullDate(dateObj);
				item.resTime = getFullTime(dateObj);

				if (item.status === 'KEPT') { allSeatNumber += item.seatNr }
			})


			setReservations(res.data)
			setSeatNumber(allSeatNumber)
		}).catch((err)=>{
			setSeatNumber(0)
			setReservations([])
			if (err?.response?.status !== 404) errorHandler('TOAST', err)
		}).finally(()=>{
			setIsLoaded(true)
		})

		setSeatsPerDay(capacity*openedHours)

		return () => { 
		    setCancel(true);
		}
	}, [refreshData, capacity, openedHours, selectedDate, cancel])
		
	const sortList = () => {
		let newIcon = (sortIcon === 'down') ? 'up' : 'down';
		setSortIcon(newIcon)

		reservations.sort(()=>{
			return -1;
		});
	}

	const getFullDate = (dateObj) => {
		if (typeof dateObj !== 'object' || !(dateObj instanceof Date)) {
			dateObj = new Date(dateObj);
		}

		return dateObj.toLocaleDateString("fr-FR", 
		{
			year: 'numeric',
	    	month: 'long',
	    	day: 'numeric'
		});
	}

	const getFullTime = (dateObj) => {
		if (typeof dateObj !== 'object' || !(dateObj instanceof Date)) {
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

	const modifyDate = (current) => {
		setSelectedDate(current)
	}

	const ReservationsRender = () => {
		if (reservations.length > 0)
		{
			return (reservations.map((reserv) => {
				let {status, statusColor} = formatStatus(reserv.status);

				return (
				<ListGroupItem key={reserv._id} action={true} active={true} href={`/reservations/${reserv._id}`} className="resListItem px-0">
					<Row className="d-flex justify-content-between m-0 pt-2 w-100">
						<Col className="p-0">
							<span className="mediumText">{reserv.seatNr} Personnes</span>
							<p>{reserv.reservName}</p>
						</Col>
						<Col md={7} xl={5} className="p-0">
							<p>
								{reserv.resDate}
								<span className="mediumText mx-2"> à </span>
								{reserv.resTime}
							</p>
							<span className={` ${statusColor}`}>{status}</span>
						</Col>
					</Row>
				</ListGroupItem>
				)
			})
			)
		}
		else
		{
			return(
				<div className="d-flex align-items-center justify-content-center text-center mt-5">
					<span>Aucune réservation n'a encore été enregistrée dans votre restaurant pour la date sélectionnée.</span>
				</div>
			)
		}
	}

	return (
	<div className="resCtnr d-flex flex-column px-5 py-4">

		<ThinHeader subTitle="Gérer les réservations" />
		
		<Row className="resStatistic justify-content-center" >
			<ReservationListStat number={(seatNumber !== 0) ? 12 : 27} title="Tables disponibles" subNumber={(seatNumber !== 0) ? 15 : '0'} subTitle="tables réservées" />
			<ReservationListStat number={seatNumber} title="Places réservées" subTitle={(today !== fullDate) ? getFullDate(selectedDate, 'DATS') : 'aujourd\'hui'} />
			<ReservationListStat number={Math.round((seatNumber*100/seatsPerDay) * 10 )/10} title="Occupation de la salle" subTitle="pour toute la journée" isPercent="true"/>
		</Row>

		<Row className="resListContent">
			<Col>
				<Row className="mb-3 align-items-center">
					<p className="d-inline">Liste des réservations</p>
					<span className=" mx-2"> – </span> 
					<span>journée du {getFullDate(selectedDate, 'DATS')}</span>
					<DatePicker 
						locale={locale}
						allowClear={false}
						bordered={false}
						size='large'
						value={selectedDate ? dayjs(selectedDate) : null}
						onChange={modifyDate}
					/>
				</Row>
				<Row className="flex-column-reverse flex-md-row justify-content-between px-4" >
					<Col md={8} xxl={7} className="resList">
						<div className="d-flex justify-content-end mb-3">
							{/*<div>
								<i className="fa-solid fa-grip mr-3" onClick={console.log('oui')}></i>
								<i className="fa-solid fa-bars-staggered" onClick={console.log('oui')}></i>
							</div>*/}
							<i className={`fa-solid fa-rotate-right mr-3 ${(rotate) ? 'rotate' : ''}`} 
								onClick={() => {setRefreshData(!refreshData); setRotate(true) }}
						        onAnimationEnd={() => setRotate(false)}
							></i>
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
	</div>
	)
}

export default ReservationList;