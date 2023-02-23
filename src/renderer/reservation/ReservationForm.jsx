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
		.moreThan(15, 'Veuillez appeler le restauraut pour réserver plus de 15 places.')
		.negative('Saisie incorrecte.')
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

				let date = res.data.reservDate;
				if (date.includes('Z')) {
					date = date.split('Z')[0];
				}

				if (typeof date != 'object') {
					date = new Date(date);
				}

				/// yyyy-MM-dd 
				setResDate(date.oLocaleDateString("fr-FR", 
				{
					year: 'numeric',
			    	month: 'numeric',
			    	day: 'numeric'
				}))

				// setResTime(time)

				setReservation(res.data)
			}).catch((err)=>{
				console.log('GET ONE RESERVATION : ', err);
				// choisir si redirection quelque soit l'erreur, puisque c'est on click qu'on va dessus.
				// ErrorHandler('REDIRECT', err.status) 
			})
		}
	}, [isEdit, resID])

    const onSubmit = (resID, values) => {
    	if (isEdit) {
    		editReservation(resID, values).then((res) => {
				// navigate(`/reservations/${res.data._id}`, { replace: true })
    			console.log(res)
            }).catch((err) => {
            	console.log(err)
            })
    	} else {
	        createReservation(values).then((res) => {
				// navigate(`/reservations/${res.data._id}`, { replace: true })
	        	console.log(res)
            }).catch((err) => {
            	console.log(err)
            })
    	}
    };

    const { values, errors, handleChange, /*handleSubmit, handleBlur, touched, setFieldValue*/ } =
    useFormik(
    {
    	initialValues: {
    		reservName: '',
			reservPhone: '',
			resDate: '',
			resTime: '',
			seatNr: 0,
			status: 'KEPT',
			userID: '',
			type: 'INDOOR'
    	},
        validationSchema,
        onSubmit
    });

	return (
		<div className="resCtnr d-flex flex-column px-5 py-4">

			<ThinHeader subTitle="Gérer les réservations" />

			<Row className="resFormTop pl-5 ml-1">
				<Col md={7} className="pl-2 pr-0">
					<Input 
						name="reservName"
                        desc="Nom du client"
                        type="text"
                        onChange={handleChange}
                        value={reservation.reservName ?? values.reservName}
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
                        value={reservation.reservPhone ?? values.reservPhone}
                        placeholder="0625489875"
                        error={
                            errors.reservPhone
                        }
					/>

					<Input 
						name="reservDate"
                        desc="Date de la réservation"
                        type="date"
                        onChange={handleChange}
                        value={resDate ?? values.resDate}
                        error={
                            errors.reservDate
                        }
					/>

					<Input 
						name="resTime"
                        desc="Heure de la réservation"
                        type="time"
                        onChange={handleChange}
                        value={resTime ?? values.resTime}
                        error={
                            errors.resTime
                        }
					/>

					<Input 
						name="seatNr"
                        desc="Nombre de personnes"
                        type="number"
                        onChange={handleChange}
                        value={reservation.seatNr ?? values.seatNr}
                        placeholder="19h30"
                        error={
                            errors.seatNr
                        }
					/>
				</Col>
				<Col xs={7} className="px-0 mt-4">
					<div className="d-flex justify-content-end">
						<Button type="submit">{(isEdit) ? 'Modifier' : 'Ajouter la réservation' }</Button>
 					</div>
				</Col>
			</Row>
		</div>
	)
}

export default ReservationDetail;