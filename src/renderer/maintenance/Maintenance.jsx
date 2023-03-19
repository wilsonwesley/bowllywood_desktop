import './maintenance.scss';
import ThinHeader from '../../components/ThinHeader';
import { Link } from 'react-router-dom';

const Maintenance = () => {
	return (
		<div className="maintCntr d-flex flex-column justify-content-between px-3 py-4">	
			<ThinHeader />

			<div className="textCntr flex-column flex-center align-self-center px-5">
			  <h2 className="mauikea_font">Page en maintenance</h2>
			  <p className="text-justify">Cette page a mangé quelque chose et a fait une indigestion... Notre équipe s'efforce de l'osculter, et lui donne un bol de riz avec une pincée de créativité. Elle devra patienter un peu pour vous être à votre service !</p>
			  <Link to="/" className="homeLink flex-center text-decoration-none">
			    <i className="fa-solid fa-house mr-3" />
			    <span>Retourner à la page d'accueil</span>
			  </Link>
			</div>

			<span className="text-center">Nous nous excusons pour la gêne occasionnée.</span>
		</div>
	)
}

export default Maintenance;