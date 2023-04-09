import './reservation.scss';
// routines
import { getOneReservation, editReservation, createReservation, getReservationByDay } from '../../services/reservation';
import { getRestaurantDetail } from '../../services/restaurants';
import { getCurrentUserDetails } from '../../services/users';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { errorHandler } from '../../utils/errorHandler';
import jwt_decode from "jwt-decode";
// dateTime
import moment from 'moment';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/fr_FR'
// front
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Col } from 'react-bootstrap';
import ThinHeader from '../../components/ThinHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import Input from '../../components/Input';
import CustomTimePicker from '../../components/CustomTimePicker';
import Button from '../../components/Button';

// regex for format : 2023-03-05T18:40
const regex = new RegExp(/^([0-9]{4})-([0-9]{2})-([0-9]{2})[T]([0-9]{2})[:]([0-9]{2})/gm);

const validationSchema = yup.object({
	reservName: yup
		.string()
		.required('Ce champ est obligatoire'),

	reservPhone: yup
		.string()
        .nullable(true),

	resDate: yup
		.string()
		.required('Ce champ est obligatoire'),

	resTime: yup
		.string()
		.required('Ce champ est obligatoire'),

	seatNr: yup
		.number()
		.moreThan(0, 'Renseignez au moins une place.')
		.lessThan(16, 'Veuillez appeler le restauraut pour réserver plus de 15 places.')
		.required('Ce champ est obligatoire'),

	status: yup
		.string()
		.required('Une erreur est survenue durant la vérification des informations saisies.')
		.matches('^(KEPT)$|^(CLS)$|^(CLD)$', 'Saisie incorrecte.')
		.default('KEPT')
})

function ReservationDetail ({ action='ADD' }) {

	const [ reservation, setReservation ] = useState({}),
		  [ resDate, setResDate ] = useState(''),
		  [ restaurantID, setRestaurantID ] = useState(''),
		  [ restauCapacity, setRestauCapacity ] = useState(''),
		  [ disabledHours, setDisabledHours ] = useState([]),
		  [ overBookedHalf, setOverBookedHalf ] = useState([]),
		  [ schedule, setSchedule ] = useState(),
		  [ dayOverBooked, setDayOverBooked ] = useState(false),
		  [ isLoaded, setIsLoaded ] = useState(false),
		  [ resTime, setResTime ] = useState('');

	const { id } = useParams(),
		  navigate = useNavigate();

	let editMode = false,
		resID = '';
	if (action === 'EDIT') {
		editMode = true;
		resID = id;
	}

    const onSubmit = (values) => {

    	// format date & time
	    values.reservDate = `${values.resDate}T${values.resTime}:00.000Z`
	    delete values.resDate;
	   	delete values.resTime;

    	if (!values.consumerID) delete values.consumerID;

    	if (editMode) {
    		editReservation(resID, values).then((res) => {
				navigate(`/reservations/${res.data._id}`, { replace: true })
            }).catch((err) => {
            	// setReturnedError(err.response.data)
            })
    	} else {
	        createReservation(values).then((res) => {
				navigate(`/reservations/${res.data._id}`, { replace: true })
            }).catch((err) => {
            	// setReturnedError(err.response.data)
            })
    	}
    };

    const setTimeSchedule = (selectedDate, time) => {
    	const splited = time.split(':', 2), // HH:mm(:ss)
			  currHour = parseInt(splited[0]),
			  currMins = parseInt(splited[1]);

		let newDate = new Date(selectedDate.setHours(currHour,currMins,0,0))
		return newDate;
    }

    const getHourFromString = (stringHour) => parseInt(stringHour.slice(0,2));

    const getDateObject = (date) => {
    	let correctDate = date.replace('.000Z', '');
    	return new Date(correctDate)
    }

    const { values, errors, handleChange, setFieldValue, handleReset, handleSubmit } =
    useFormik(
    {
		enableReinitialize: true,
		initialValues: {
			reservName: reservation.reservName ?? '',
			reservPhone: reservation.reservPhone ?? '',
			resDate: resDate ?? '',
			resTime: resTime ?? '11:00',
			seatNr: reservation.seatNr ?? 1,
			status: reservation.status ?? 'KEPT',
			restaurantID: reservation.restaurantID ?? '',
			consumerID: reservation.consumerID ?? '',
			type: reservation.type ?? 'INDOOR'
		},
        validationSchema,
        onSubmit
    });

	// get reservation informations if it is edit mode
	useEffect(()=>{
		let cancel = false;

   		// get fav resturant
		const currentTokens = localStorage.getItem("userTokens");
		if (currentTokens) {
			const decodedToken = jwt_decode(JSON.parse(currentTokens).token),
				  userRole = decodedToken?.roleID ?? '',
				  profRoles = ['ROLE_MANAGER', 'ROLE_CEO', 'ROLE_WAITER']

			if (profRoles.includes(userRole)) {
				setRestaurantID(decodedToken?.workingResID)
			} else {
				getCurrentUserDetails().then((res)=>{
					if (cancel) return;
					debugger
					setRestaurantID(res.data.data.favouriteRestaurant_id);
				}).catch((err)=>{
					debugger
				})
			}
		}

		if (editMode && resID !== '')
		{
			getOneReservation(resID).then((res)=>{

				if (cancel) return;
				// default date & time
				let dateTime = res.data.reservDate;
    			if (regex.test(dateTime)) {
    				const [date, time] = dateTime.split('T', 2)
					setResDate(date)
					setResTime(time.slice(0, 5))
    			}
				setReservation(res.data)

			}).catch((err)=>{
				if (err?.code === 404) {
					errorHandler('REDIRECT', err, navigate, 'réservation') 
				}
				console.error(err)
			}).finally(()=>{
				setIsLoaded(true)
			})
		}
		else 
		{
			// default date like dd/MM/yyyy
			let nowDate = new Date();
			let date = nowDate.toLocaleDateString('en-CA');
			setResDate(date);
		}

		return () => { 
		    cancel = true;
		}
	}, [editMode, resID, navigate]);

	// get current restaurant infos
	useEffect(()=>{   		
		let cancel = false;
	    // get restaurant informations
		if (restaurantID)
		{
		    getRestaurantDetail(restaurantID).then((res)=>{
		    	if (cancel) return;
		    	// i got every restaurants
		    	if (res?.data?.length > 1) {throw new Error(404)}
		    	// get schedule of current restaurant : archive 
		        const scheduleObj = {
					open : '11:00:00',
					close : '23:00:00'
	        	}
		    	setRestauCapacity(40) //res?.data?.capacity
		        setSchedule(scheduleObj)
			}).catch((err)=>{
				console.error('RESTAURANT : ', err)
			})
		}
		return () => { 
		    cancel = true;
		}
	}, [restaurantID])

	// get reservations disponibilities
	useEffect(()=>{   		
		let cancel = false,
	    	bookedHalf = [],
	    	bookedHour = [],
	    	lastBookedHour;

		if (values.resDate && schedule && restauCapacity)
		{
    		// store hours that exceed the schedule
    		const selectedDate = new Date(values.resDate),
    			  openHour = getHourFromString(schedule.open),
    			  closeHour = getHourFromString(schedule.close),
				  hoursBeforeOpen = Array.from({ length: openHour }).map( (_, index) => index ),
				  hoursAfterClose = Array.from({ length: 24 }).map((_, index) => index).filter((hour) => hour > (closeHour-2));

			bookedHour.push(...hoursAfterClose)
			bookedHour.push(...hoursBeforeOpen)

			// get enabled hours by day
			getReservationByDay(values.resDate, 'KEPT').then((res)=>{
				if (cancel) return;
				const reservOfDay = res.data,
	    			  openedTime = setTimeSchedule(selectedDate, schedule.open),
	    			  closedTime = setTimeSchedule(selectedDate, schedule.close);

				// calculate the over booked hours 
	    		let currHalf = openedTime;
	    		do {
	    			let minHour = moment(currHalf).subtract(2, 'h').toDate(),
						maxHour = moment(currHalf).add(2, 'h').toDate(),
	    				reservedBefore = 0,
	    				reservedAfter = 0;

	    			// eslint-disable-next-line
					reservOfDay.forEach((checkedReservation)=>{
						let checkedResID = checkedReservation._id;
						if (editMode && (checkedResID === reservation._id))
						{
							return
						}

						const reservationTime = getDateObject(checkedReservation.reservDate),
							  currHalfTime =  new Date(currHalf);

						// check si la réservation se trouve après l'heure minimum, et si se termine avant l'heure courante
						if (reservationTime > minHour && reservationTime < currHalfTime) {
							reservedBefore += checkedReservation.seatNr;
						}

						// check si la réservation commence vers l'heure courante
						if (reservationTime >= currHalfTime && reservationTime < maxHour) {
							reservedAfter += checkedReservation.seatNr;
						}
					})
		
					const leftBefore = restauCapacity - reservedBefore,
						  leftAfter = restauCapacity - reservedAfter,
						  leftDuring = restauCapacity - (reservedAfter + reservedBefore);


					if (leftDuring < values.seatNr || leftBefore < values.seatNr || leftAfter < values.seatNr)
					{
						bookedHalf.push(currHalf);
					}

					currHalf = moment(currHalf).add(30, 'm').toDate();
	    		} while (currHalf < closedTime)

				// store over booked hour HH: and half-hour HH:mm
				setOverBookedHalf(bookedHalf)
				bookedHalf.forEach((currDate)=>{
					let currBookedHour = currDate.getHours();
					if (currBookedHour === lastBookedHour)
					{
						bookedHour.push(currBookedHour)
					}
					lastBookedHour = currDate.getHours();
				})

				// if every hour are booked, disable the selection
				if (bookedHour.lentgh >= 24) {
					setDayOverBooked(true)
				}

				const userChoice = getHourFromString(values.resTime);
	    		if (userChoice && bookedHour.includes(userChoice))
	    		{
    				setFieldValue('resTime', '');
	    			const err = {message: `Pas de bowl ! Aucune place n'est disponible pour ${values.seatNr} places à l'heure choisie. Veuillez en sélectionner une à nouveau.`}
	    			errorHandler('TOAST', err)
	    		}

			}).catch((err)=>{
				setOverBookedHalf([])
				console.log('DAY SEATS : ', err?.response?.data ?? err)
			})
		}

		setDisabledHours(bookedHour)

		return () => { 
		    cancel = true;
		}
	}, [values.resDate, values.resTime, values.seatNr, setFieldValue, restauCapacity, schedule, reservation, editMode])

	const disabledTime = (current, type) => {
		const disabledMinutes = (current) => {
			if (current > 0) {
				let bookedMins = []
				overBookedHalf.forEach((currHalf)=>{
					let currBookedHour = currHalf.getHours();
					if (currBookedHour === current && !disabledHours.includes(currBookedHour))
					{
						bookedMins.push(currHalf.getMinutes())
					}
				})
				return bookedMins;
			}
		}

		return {
			disabledHours: () => disabledHours,
			disabledMinutes: disabledMinutes,
		}
	};

	return (
		<div className="resCtnr d-flex flex-column px-5 py-4">

			<ThinHeader subTitle="Gérer les réservations" />
			<form onSubmit={handleSubmit} className="resForm  pl-5 ml-1">
				{
					(!editMode)
					? <Col xs={12} className="pl-4 mb-4">
						<h2 className="m-0">Ajout d'une réservation</h2>
					</Col>
					: <Col xs={12} className="pl-2 mb-4">
						<p>Modication de la réservation de</p>
						<h2 className="m-0">M&#183;Mme {reservation.reservName}</h2>
					</Col>
				}

				{
					(!editMode || isLoaded)
					? <> <Col md={7} className="d-flex flex-column pl-2 pr-0">
						<Input 
							name="reservName"
	                        desc="Nom du client"
	                        type="text"
	                        onChange={handleChange}
	                        value={values.reservName}
	                        placeholder="Hertat"
	                        error={errors.reservName}
						/>

						<Input 
							name="reservPhone"
	                        desc="Numéro de téléphone"
	                        type="text"
	                        onChange={handleChange}
	                        value={values.reservPhone}
	                        placeholder="ex: 0625489875"
	                        error={errors.reservPhone}
						/>

						<Input 
							name="resDate"
	                        desc="Date de la réservation"
	                        type="date"
	                        onChange={handleChange}
	                        min={dayjs().format('YYYY-MM-DD')}
	                        value={values.resDate}
	                        error={errors.resDate}
						/>

						<CustomTimePicker
							name="resTime"
	                        desc="Heure de la réservation"
	          				format="HH:mm"
							locale={locale}
							allowClear={false}
							size='large'
							onChange={(timeVal)=>{
								if (timeVal)
								{
	    							setFieldValue('resTime', timeVal.format('HH:mm'));
								}
	                        }}
	      					value={values.resTime ? moment(values.resTime, 'HH:mm') : null}
	      					minuteStep={30}
	      					disabledTime={disabledTime}
							showNow={false}
							inputReadOnly={true}
							disabled={dayOverBooked}
	                        error={errors.resTime}
							// cellRender
						/>

						<Input 
							name="seatNr"
	                        desc="Nombre de personnes"
	                        type="number"
	                        onChange={(value)=>{
	                        	let targetVal = value.target.value;
								if (targetVal < 1) {
									targetVal = 0;
								}
								else if (targetVal > 15) {
									targetVal = 16;
								}
								setFieldValue('seatNr', targetVal)
							}}
	                        value={values.seatNr}
	                        placeholder="ex: 5"
	                        error={errors.seatNr}
						/>
					</Col>

					<Col xs={7} className="px-0 mt-4">
						<div className="d-flex btnCtnr justify-content-end">
							<Button type="button" bsType="secondary" onClick={handleReset}>Réinitialiser la saisie</Button>
							<Button type="submit">{(resID, editMode) ? 'Modifier' : 'Ajouter la réservation' }</Button>
	 					</div>
					</Col>
					</>
					: <LoadingSpinner />
				}
			</form>
		</div>
	)
}

export default ReservationDetail;