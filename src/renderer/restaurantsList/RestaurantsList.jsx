import { getAllRestaurants } from './../../services/restaurants';
import { useEffect, useState } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

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
        </Container>
    );
};
export default RestaurantsListScreen;
