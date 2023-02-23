import './GoBackButton.scss'
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1)
	}

	return (
		<div className="backBtn d-flex align-items-center justify-content-center" onClick={goBack}>
			<i className="fa-solid fa-circle-chevron-left"></i>
			<p className="mb-0 ml-3">Précédent</p>
		</div>
	)
}

export default GoBackButton
