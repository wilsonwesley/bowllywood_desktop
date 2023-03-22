import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import SimplePopup from '../components/SimplePopup';
import 'react-toastify/dist/ReactToastify.css';

// {errType, errCode, catchedMsg, subjectName='élément'}
function useErrorHandler(errType, errCode, catchedMsg, subjectName='élément') {
	const [errTitle, setErrTitle] = useState(''),
		  [errMessage, setErrMessage] = useState('');
	
	const navigate = useNavigate();

	useEffect(()=>{
		// define error message to display
		// const serverCodeRx = new RegExp('/^(5[0-9]{2})$/s'); // matches 500, 501, etc...
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
				// case 500:
				default:
					// [EVOLUTION] : send the error to the service for analysis.
					returnMsg = `Une erreur technique est survenue. Veuillez recommencer plus tard.`
					break;
			}

			return returnMsg;
		}
		
		setErrTitle(`Erreur ${errCode}`)
		if (catchedMsg) {
			setErrMessage(catchedMsg)
		} else {
			setErrMessage(get_default_message(errCode, subjectName))
		}

		// return object or redirect to page
		switch (errType)
		{
			case 'REDIRECT':
				// It's recommended to use redirect in loaders and actions rather than useNavigate in your components when the redirect is in response to data.
				// return redirect('/');
				navigate('/error', {
					replace: true, // remove track history
					state: {
						errTitle,
						errMessage 
					}
				})
				break;
			case 'POPUP':
				return SimplePopup(errTitle, errMessage)
			case 'TOAST':
				toast.error(`${errTitle} : ${errMessage}`, {
					position: "bottom-center",
					autoClose: 5000*2,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					// theme: "light",
				});
				break;
		}
	}, [])

	return errType;

}

export default useErrorHandler;