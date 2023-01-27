import { Col, Row, Container } from 'react-bootstrap';

const ThinHeader = ({subTitle}) => {

	return (
	<Container fluid>
		<Row>
			<Col>
				<h1 className='thinHeader-title m-0'>Bowllywood</h1>
				<p style={{fontSize:"0.8em"}}>Bonjour {subTitle}</p>
			</Col>
		</Row>
	</Container>
	)
}

export default ThinHeader;