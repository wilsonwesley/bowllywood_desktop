import '../sass/styles.scss';
import { Link } from 'react-router-dom';

const IconNavigation = ({iconArr}) => {

	const IconElement = ({keyNb, icon, text, route}) => {
		return (
			<Link key={keyNb} to={route} className="d-flex flex-column align-items-center text-decoration-none">
				<i className={icon}></i>
				<p className="mb-0 mt-2">{text}</p>
			</Link>
		)
	}

	if (Array.isArray(iconArr)) {

		return (
		<div className="homeNavigation d-flex">
			{
				iconArr.map((iconItem, index)=>{
					return <IconElement key={index} icon={iconItem.icon} text={iconItem.text} route={iconItem.route}/>
				})
			}
		</div>
		)
	} else {
		return '';	
	}

}

export default IconNavigation;