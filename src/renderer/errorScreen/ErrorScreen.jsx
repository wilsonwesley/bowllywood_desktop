import './errorScreen.scss';
import ThinHeader from '../../components/ThinHeader';
import { Link } from 'react-router-dom';

const ErrorScreen = ({errCode='', errText}) => {

	if (!errText)
	{
		errText = 'Une erreur inconnue est survenue. Veuillez recommencer ou retourner à la page d\'accueil.';
	}

	return (
		<div className="errorCntr d-flex flex-column justify-content-between px-5 py-4">	
			<ThinHeader />

			<div className="textCntr flex-column flex-center align-self-center px-5">
			  <h2 className="mauikea_font">Erreur {errCode}</h2>
			  <p className="text-center">Pas de bowl ! {errText}</p>
			  <Link to="/" className="homeLink flex-center text-decoration-none">
			    <i className="fa-solid fa-house mr-3" />
			    <span>Retourner à la page d'accueil</span>
			  </Link>
			</div>

			<span className="text-center">Excusez-nous pour la gêne occasionnée.</span>
		</div>
	)
}

export default ErrorScreen;