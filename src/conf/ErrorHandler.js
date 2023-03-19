// import { Toast, Popup} from 'react';
// import { redirection } from 'react-router-dom';

// définir l'élément à afficher. si redirection : pas de message à trouver ni à recevoir
// définir la string à diffuser avec concatécation etc. vérif type et subjectName

/**
 * Define the type and the message of the error.
 * If redirection, redirect to a page corresponding to the given errCode (404, 401, or 'MAINT' for maintenance page)
 * 
 * @param  {string} 		errType     'POPUP', 'TOAST', 'REDIRECT', 
 * @param  {string || int} 	errCode     'MAINT' for redirection to the maintenance page OR type of the catched err
 * @param  {string} 		subjectName Name to concatenate into the message string
 */
const ErrorHandler = ({errType, errCode=null, catchedMsg=null, subjectName=null}) => {

	// const [errMEssage, setErrMessage] = useState('');

	/*const codeMessages = [
		001 = 'Le service technique est sur la touche !'
		404 = 'n\'a été trouvé.'
		401 = 'Vous n\'avez pas les droits pour accéder à cette inforamtion.'
		500 = 'Une erreur interne au serveur est apparue.'
	] */
	const defineMessage = (errCode, subjectName) => {

		
		// codeMessages[errCode]

	}

	switch (errType)
	{
		case 'REDIRECT':
			// redirect to page depending of the errCode
			break;
		case 'TOAST':
			defineMessage(errCode, subjectName)
			// redirect to page depending of the errCode
			break;
		case 'POPUP':
			// redirect to page depending of the errCode
			break;
		default:
			// statements_def
			break;
	}

}

export default ErrorHandler;