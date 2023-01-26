import { ListGroupItem } from 'react-bootstrap';

const HomeListItem = ({title, isDisplayed="true", description, index}) => { 

	const diplayMode = (isDisplayed === "true") ? 'flex' : 'none';

	return (
	<ListGroupItem key={index} className={`d-${diplayMode} row gap-5 justify-content-center align-items-center border-0 mb-3`}>
		<div className="col-sm-4">
			<h2 className="homeListTitle m-0">{title}</h2>
		</div>

		<div className="col-sm-5">
			<p className="homeListDesc m-0">{description}</p>
		</div>
	</ListGroupItem>
)
}

export default HomeListItem;

/*<Container fluid>
	<Row className="justify-content-center align-items-center border" >
		<Col xs={4}>
			<h2>Planning employés</h2>
		</Col>

		<Col xs={6}>
			<p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cum Voluptas, voluptate nam.</p>
		</Col>
	</Row>
</Container>*/