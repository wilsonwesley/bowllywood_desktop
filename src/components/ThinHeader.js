import { Col, Row, Container } from 'react-bootstrap';

const ThinHeader = ({subTitle}) => {

	return (
	<Container fluid className="border">
		<Row>
			<Col className="px-5 py-4">
				<h1 className='thinHeader-title m-0'>Bowllywood</h1>
				<p style={{fontSize:"0.8em"}}>Bonjour {subTitle}</p>
			</Col>
		</Row>
	</Container>
	)
}

export default ThinHeader;