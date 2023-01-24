import { Col, Row, Container } from 'react-bootstrap';


function ThinHeader({subTitle}) {

	return (
	<Container>
		<Row>
			<h1 font-size={16}>Bowllywood</h1>
			<p>{subTitle}</p>
		</Row>
	</Container>
	)
}

export default ThinHeader;