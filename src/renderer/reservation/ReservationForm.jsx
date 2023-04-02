import './reservation.scss';
// routines
import { getOneReservation, editReservation, createReservation } from '../../services/reservation';
import { useState, useEffect/*, useContext*/ } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { errorHandler } from '../../utils/errorHandler';
// dateTime
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from 'localize-react';
// front
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Row, Col } from 'react-bootstrap';
import ThinHeader from '../../components/ThinHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

// regex for format : 2023-03-05T18:40
const regex = new RegExp(/^([0-9]{4})-([0-9]{2})-([0-9]{2})[T]([0-9]{2})[:]([0-9]{2})/gm);

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
		  [ resDate, setResDate ] = useState(''),
		  [ resTime, setResTime ] = useState('');

	const { id } = useParams(),
		  navigate = useNavigate();

    // const authContext = useContext(AuthContext),
    // userID = authContext.auth.userID;

	let editMode = false,
		resID = '';

	if (action === 'EDIT') {
		editMode = true;
		resID = id;
	}

	// get reservation informations if it is edit mode
	useEffect(()=>{
		if (editMode && resID !== '')
		{
			getOneReservation(resID).then((res)=>{

				// default date & time
				let dateTime = res.data.reservDate;
    			if (regex.test(dateTime)) {
    				const [date, time] = dateTime.split('T', 2)
					setResDate(date)
					setResTime(time.slice(0, 5))
    			}
				setReservation(res.data)

			}).catch((err)=>{
				console.log('GET ONE RESERVATION : ', err);
				// setReturnedError('La réservation n\'a pas été trouvée.')
				// navigate('reservations/create', {replace: true})
				// choisir si redirection quelque soit l'erreur, puisque c'est on click qu'on va dessus.
				// errorHandler('REDIRECT', err.status) 
			})
		}
		else 
		{
			// default date & time
			let nowDate = new Date();
			let date = nowDate.toLocaleDateString('en-CA'), // dd/MM/yyyy
				time = nowDate.toLocaleTimeString('fr').slice(0, 5);; // HH:mm

			setResDate(date);
			setResTime(time);
		}
	}, [editMode, resID])

    const onSubmit = (values) => {

    	// format date & time
    	let dateTime = `${values.resDate}T${values.resTime}`
	    values.reservDate = new Date(dateTime)
	   	delete values.resDate;
	   	delete values.resTime;

    	if (!values.userID) delete values.userID;

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

    const { values, errors, handleChange, setFieldValue, handleReset, handleSubmit } =
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
			restaurantID: reservation.restaurantID ?? '',
			consumerID: reservation.consumerID ?? '',
			type: reservation.type ?? 'INDOOR'
		},
        validationSchema,
        onSubmit
    });

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

				<Col md={7} className="d-flex flex-column pl-2 pr-0">
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
                        value={values.resDate}
                        error={errors.resDate}
					/>

					<Input 
						name="resTime"
                        desc="Heure de la réservation"
                        type="time"
                        onChange={handleChange}
                        value={values.resTime}
                        error={errors.resTime}
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
			</form>
		</div>
	)
}

export default ReservationDetail;