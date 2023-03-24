import { Col, Row, Container } from 'react-bootstrap';
import './thinHeader.scss'

const ThinHeader = ({subTitle}) => {

	return (
	<Container fluid className="thinHeader">
		<Row>
			<Col>
				<h1 className='thinHeaderTitle m-0'>Bowllywood</h1>
				<p>{subTitle}</p>
			</Col>
		</Row>
	</Container>
	)
}

export default ThinHeader;