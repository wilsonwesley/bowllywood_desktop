import Card from 'react-bootstrap/Card';
import './Card.scss';

const ProductCard = () => {
    return (
        <Card className="generalCardStyle">
            <Card.Img variant="top" src="https://via.placeholder.com/286x180.png" />
            <Card.Body>
                <Card.Title>Lorem ipsum</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Lorem ipsum same</Card.Subtitle>
                <Card.Text>Lorem ipsum but longer</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard