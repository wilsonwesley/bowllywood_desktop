import { getAllRestaurants } from './../../services/restaurants';
import { useEffect, useState } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import FlipCard from './../../components/Flipcard';

const RestaurantsListScreen = () => {

    const [allRestaurants, setAllRestaurants] = useState([]);
    useEffect(() => {
        getAllRestaurants()
            .then((res) => {
                setAllRestaurants(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Container>
            <Row>
                <Col className='col-12 flex-center'>
                    <img
                        src="bowllywood.png"
                        alt="Logo du restaurant de bowls nommé Bowllywood"
                    />
                </Col>
            </Row>
            <Row>
                {allRestaurants.map((card) => (
                    <Col xs={12} sm={6} md={4}>
                    <FlipCard key={card.id} card={card} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default RestaurantsListScreen;
