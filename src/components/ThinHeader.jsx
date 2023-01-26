import { Col, Row, Container } from 'react-bootstrap';

const ThinHeader = ({subTitle}) => {

	return (
	<Container fluid>
		<Row>
			<Col>
				<h1 className='m-0'>Bowllywood</h1>
				<p>Bonjour {subTitle}</p>
			</Col>
		</Row>
	</Container>
	)
}

export default ThinHeader;