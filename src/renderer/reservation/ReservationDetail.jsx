import './reservation.scss';
// routines
import { useState, useEffect } from 'react';
import { getOneReservation, cancelReservation } from '../../services/reservation';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from '../../utils/errorHandler';
import ThinHeader from '../../components/ThinHeader';
// front
import LoadingSpinner from '../../components/LoadingSpinner';
import { Row, Col } from 'react-bootstrap';

function ReservationDetail () {

	const [ reservation, setReservation ] = useState({}),
		  [ loaded, setLoaded ] = useState(false),
		  [ isEditable, setIsEditable ] = useState(true),
		  [ status, setStatus ] = useState(''),
		  [ statusColor, setStatusColor ] = useState(''),
		  [ resDate, setResDate ] = useState(''),
		  [ resTime, setResTime ] = useState('');

	const { id } = useParams();
	const resID = id;

	const navigate = useNavigate();

	useEffect(()=>{
		let cancel = false;

		if (resID && !cancel)
		{
			getOneReservation(resID).then((res)=>{
				let reservDate = new Date(res.data.reservDate)
				let itemTime = reservDate.getTime(),
					nowTime = new Date().getTime();

				if (res.data.status !== 'CLD' && itemTime <= nowTime)
				{
					res.data.status = 'CLS';
				}

				formatStatus(res.data.status);

				let dateObj = res.data.reservDate;
				if (dateObj.includes('Z')) {
					dateObj = dateObj.split('Z')[0];
				}

				if (typeof dateObj != 'object') {
					dateObj = new Date(dateObj);
				}

				setResDate(dateObj.toLocaleDateString("fr-FR", 
				{
					year: 'numeric',
			    	month: 'long',
			    	day: 'numeric'
				}))

				let minutes = dateObj.getMinutes();
				setResTime(`${dateObj.getHours()}h${ (minutes !== 0) ? minutes : ''}`)

				setReservation(res.data)

				// the reservation can be edited or cancelled if it isn't closed
				// or if the reservation date is lower than the current date
				let currDate = new Date('now');
				setIsEditable(res.data.status === 'KEPT' || (res.data.status === 'CLD' && res.data.reservDate < currDate))

			}).catch((err)=>{
				if (err?.response?.status === 403)
				{
					delete err?.response?.data?.message;
					delete err?.message;
				}
				errorHandler('REDIRECT', err, navigate, 'réservation')
			}).finally(() => {
				setLoaded(true);
			})
		}

		return () => { 
		    cancel = true;
		}
	}, [resID, navigate])

	const formatPhone = (phoneNumber) => {

		let formattedPhone = '';
		if (phoneNumber.length === 10)
		{
			let end = 2;
			for (let beg = 0; beg <= 6; beg+=2)
			{
				formattedPhone += `${phoneNumber.slice(beg, end)}.`
				end += 2
			}
			formattedPhone += phoneNumber.slice(8, 10);
		}

		return (formattedPhone !== '') ? formattedPhone : phoneNumber;
	}

	const formatStatus = (statusCode) => {
		switch (statusCode) {
			// kept
			case 'KEPT':
				setStatus('Maintenu');
				setStatusColor('positiveColor');
				break;
			// cancelled
			case 'CLD':
				setStatus('Annulé');
				setStatusColor('negativeColor');
				break;
			// closed
			case 'CLS':
				setStatus('Terminé');
				setStatusColor('warningColor');
				break;
			default:
				setStatus('Indéfini');
				setStatusColor('')
		}
	}

	const navigateForm = () => {
		if (isEditable) navigate(`/reservations/form/${id}`, { action: 'EDIT', replace: true })
	}

	const cancelReservationBtn = (id) => {
		if (isEditable)
		{
			cancelReservation(id).then((res) => {
				formatStatus(res.data.status);
				setIsEditable(false)
			}).catch((err) => {
				console.log(err)
			})
		}
	}

	return (
		<div className="resCtnr d-flex flex-column px-5 py-4">

			<ThinHeader subTitle="Gérer les réservations" />

			<Row className="resDetailTop pl-5 ml-1">

				<Col xs={4} md={3} className=" pl-2 pr-0">
					<p>Réservation de</p>
					<h2 className="m-0">M&#183;Mme {reservation?.reservName}</h2>
					<p>{(reservation?.reservPhone) ? <span>{formatPhone(reservation?.reservPhone)}</span> : 'Aucun tél. renseigné' }</p>
				</Col>

				<Col xs={4} md={2}>
					<div className="d-flex align-items-end">
						<i className={`fa-solid fa-pen-to-square mr-3 ${ (!isEditable) ? 'disabled' : '' }`} onClick={()=>{navigateForm(reservation?._id)}}></i>
						<i className={`fa-solid fa-square-xmark negativeColor ${ (!isEditable) ? 'disabled' : '' }`} onClick={()=>{cancelReservationBtn(reservation?._id)}}></i>
					</div>
				</Col>
			</Row>

			<Row className="offset-md-2">
				<Col xs={12} className="resDetailContent py-5 pl-5 mt-4">
					{
						(loaded) 
						? <> <div className="mb-4">
							<p className={`largeText ${statusColor}`}>{status}</p>
							<p >{resDate}<span className="largeText px-4"> à </span>{resTime}</p>
						</div>
						<div className="detailNumbers">
							<p>
								<span className="font-weight-bold mr-2">{reservation?.seatNr}</span> 
								<span className="largeText">Personnes</span>
							</p>
							<p>
								<span className="font-weight-bold mr-2">2</span> 
								<span className="largeText">tables</span>
							</p>
						</div></>
						: <LoadingSpinner />
					}
				</Col>
			</Row>
		</div>
	)
}

export default ReservationDetail;