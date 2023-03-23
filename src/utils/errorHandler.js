import {Navigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import simplePopup from '../components/SimplePopup';
import 'react-toastify/dist/ReactToastify.css';

export function errorHandler(errType, errorCatched, navigate, subjectName) {
	let errTitle, errMessage;

	let errCode = errorCatched.response.status ?? errorCatched.code,
		catchedMsg = errorCatched.response.data.message;

	// define error message to display
	const get_default_message = (errCode, subjectName) => {
		let returnMsg = '' ;

		// check passed elements 
		subjectName = (typeof subjectName !== 'string') ? 'élément' : subjectName ;
		subjectName = subjectName.toLowerCase();

		// define message
		switch (errCode)
		{
			case 400:
				returnMsg = `Impossible de traiter la requête. Veuillez vérifier les informations fournies.`
				break;
			case 404:
				returnMsg = `Aucun.e ${subjectName} n'a été trouvé.e lors de la recherche.`
				break;
			case 401:
				returnMsg = `Vous devez être connecté pour accéder à cette page. Vous n'avez pas les droits ou avez été déconnecté.`
				break;
			case 403:
				returnMsg = `Vous n'avez pas les droits pour accéder à ces informations.`
				break;
			case 'ERR_NETWORK':
				returnMsg = 'Une erreur réseau est survenue durant la requête, notre équipe technique est sur la touche !'
				break;
			default:
				// [EVOLUTION] : send the error to the service for analysis.
				returnMsg = `Une erreur technique est survenue. Veuillez recommencer plus tard.`
				break;
		}
		return returnMsg;
	}
	
	if (catchedMsg && errCode != 'ERR_NETWORK') {
		errMessage = catchedMsg
	} else {
		errMessage = get_default_message(errCode, subjectName)
	}
	errTitle =`Erreur ${errCode}`

	// return object or redirect to page
	switch (errType)
	{
		case 'REDIRECT':
			return navigate('/erreur',
			{
				replace: true, 
				state: {
					code: errCode, 
					message: errMessage
				} 
			})
		case 'POPUP':
			return simplePopup(errTitle, errMessage)
		case 'TOAST':
			toast.dismiss(); // close last toast
			toast.error(`${errTitle} : ${errMessage}`, {
				position: "bottom-center",
				autoClose: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: false,
				theme: "light",
			});
			break;
	}
}