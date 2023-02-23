import './reservation.scss';
// import ErrorHandler from '../../conf/ErrorHandler';
import ThinHeader from '../../components/ThinHeader';
import LoadingSpinner from '../../components/LoadingSpinner';

import { useState, useEffect/*, useContext*/ } from 'react';
import { getOneReservation, editReservation, createReservation } from '../../services/reservation';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';
// form
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';

// .min(new Date(), 'Vous ne pouvez pas sélectionner une date antérieure à aujourd\'hui.')
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
		.default('KEPT'),

	userID: yup
		.string()
        .nullable(true),

	type: yup
		.string()
		.required('Une erreur est survenue durant la vérification des informations saisies.')
		.default('INDOOR')
})

function ReservationDetail ({ action='ADD' }) {

	const [ reservation, setReservation ] = useState({}),
		  [ returnedError, setReturnedError ] = useState(false),
		  [ isLoaded, setIsLoaded ] = useState(false),
		  [ resDate, setResDate ] = useState(''),
		  [ resTime, setResTime ] = useState('');

	const { id } = useParams(),
		  navigate = useNavigate();

    // const authContext = useContext(AuthContext),
    // userID = authContext.auth.userID;
	
	let isEdit = false,
		resID = '';

	if (action === 'EDIT') {
		resID = id;
		isEdit = true;
	}

	// get reservation informations if it is edit mode
	useEffect(()=>{
		if (isEdit && resID !== '')
		{
			getOneReservation(resID).then((res)=>{

				let dateTime = res.data.reservDate;
				const [date, time] = dateTime.split('T', 2)
				setResDate(date)
				setResTime(time.slice(0, 5))
				setReservation(res.data)

			}).catch((err)=>{
				console.log('GET ONE RESERVATION : ', err);
				// choisir si redirection quelque soit l'erreur, puisque c'est on click qu'on va dessus.
				// ErrorHandler('REDIRECT', err.status) 
			})
		}
	}, [isEdit, resID])

    const onSubmit = (values) => {

    	// format date & time
    	let dateTime = `${values.resDate}T${values.resTime}`
    	values.reservDate = new Date(dateTime)
    	delete values.resDate;
    	delete values.resTime;

    	if (!values.userID) delete values.userID;

    	if (isEdit) {
    		// debugger
    		editReservation(resID, values).then((res) => {
				navigate(`/reservations/${res.data._id}`, { replace: true })
            }).catch((err) => {
            	setReturnedError(err.response.data)
            })
    	} else {
	        createReservation(values).then((res) => {
				navigate(`/reservations/${res.data._id}`, { replace: true })
            }).catch((err) => {
            	setReturnedError(err.response.data)
            })
    	}
    };

    const { values, errors, handleChange, setFieldValue, handleSubmit/*, setErrors, handleBlur*/ } =
    useFormik(
    {
		enableReinitialize: true,
		initialValues: {
			reservName: reservation.reservName ?? '',
			reservPhone: reservation.reservPhone ?? '',
			resDate: resDate ?? '',
			resTime: resTime ?? '',
			seatNr: reservation.seatNr ?? 1,
			status: reservation.status ?? 'KEPT',
			userID: reservation.userID ?? '',
			type: reservation.type ?? 'INDOOR'
		},
        validationSchema,
        onSubmit
    });

	return (
		<div className="resCtnr d-flex flex-column px-5 py-4">

			<ThinHeader subTitle="Gérer les réservations" />

			{
				(returnedError) 
				? <Row className="justify-content-center">
					<Col md={6}>
						<p className="negativeColor text-center">{returnedError}</p>
					</Col>
				</Row>
				: ''
			}
			<form onSubmit={handleSubmit} className="resFormTop  pl-5 ml-1">
				{
					(!isEdit)
					? <Col xs={12} className="pl-4 mb-4">
						<h2 className="m-0">Ajout d'une réservation</h2>
					</Col>
					: <Col xs={12} className="pl-2 mb-4">
						<p>Modication de la réservation de</p>
						<h2 className="m-0">M&#183;Mme {reservation.reservName}</h2>
					</Col>
				}

				<Col md={7} className="d-flex flex-column pl-2 pr-0">
					<Input 
						name="reservName"
                        desc="Nom du client"
                        type="text"
                        onChange={handleChange}
                        value={values.reservName}
                        placeholder="Hertat"
                        error={
                        	errors.reservName
                        }
					/>

					<Input 
						name="reservPhone"
                        desc="Numéro de téléphone"
                        type="text"
                        onChange={handleChange}
                        value={values.reservPhone}
                        placeholder="ex: 0625489875"
                        error={
                            errors.reservPhone
                        }
					/>

					<Input 
						name="resDate"
                        desc="Date de la réservation"
                        type="date"
                        onChange={handleChange}
                        value={values.resDate}
                        error={
                            errors.resDate
                        }
					/>

					<Input 
						name="resTime"
                        desc="Heure de la réservation"
                        type="time"
                        onChange={handleChange}
                        value={values.resTime}
                        error={
                            errors.resTime
                        }
					/>

					<Input 
						name="seatNr"
                        desc="Nombre de personnes"
                        type="number"
                        onChange={(value)=>{
							if (value.target.value < 1) {
								value.target.value = 0;
							}
							else if (value.target.value > 15) {
								value.target.value = 16;
							}
							setFieldValue('seatNr', value.target.value)
						}}
                        value={values.seatNr}
                        placeholder="ex: 5"
                        error={
                            errors.seatNr
                        }
					/>
				</Col>
				<Col xs={7} className="px-0 mt-4">
					<div className="d-flex justify-content-end">
						<Button type="submit">{(resID, isEdit) ? 'Modifier' : 'Ajouter la réservation' }</Button>
 					</div>
				</Col>
			</form>
		</div>
	)
}

export default ReservationDetail;