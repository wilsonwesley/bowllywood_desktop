import { ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeListItem = ({title, isDisplayed="true", description, route, index}) => { 

	const diplayMode = (isDisplayed === "true") ? 'flex' : 'none';

	return (
	<ListGroupItem key={index} className={`d-${diplayMode} row gap-5 justify-content-center align-items-center border-0 mb-3`}>
		<div className="col-sm-4">
			<Link to={route}>
				<h2 className="m-0">{title}</h2>
			</Link>
		</div>

		<div className="col-sm-5">
			<p className="m-0">{description}</p>
		</div>
	</ListGroupItem>
)
}

export default HomeListItem;