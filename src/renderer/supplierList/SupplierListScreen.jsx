import { getAllSuppliers } from './../../services/suppliers';
import { useEffect, useState } from 'react';

import { Col, Row, Container, Accordion, Card } from 'react-bootstrap';
import FlipCard from './../../components/Flipcard';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const SuppliersListScreen = () => {

    const [allSuppliers, setAllSuppliers] = useState([]);
    useEffect(() => {
        getAllSuppliers()
            .then((res) => {
                setAllSuppliers(res.data);
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
                <Col className='text-center mb-4'>
                    <Link
                        to={`/suppliers/add`}
                        className="text-decoration-none text-black text-center"
                        >
                        <Button className='text-dark'> Ajouter un nouveau fournisseur</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
          
                {/* {allSuppliers.map((card) => (
                    <Col xs={12} sm={6} md={4}>
                    <FlipCard key={card.id} card={card} />
                    </Col>
                ))} */}
                {allSuppliers.map((item) => (
                    <Col xs={12} sm={6} md={4}>
                        <Accordion defaultActiveKey="0" className='text-center'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{item.name}</Accordion.Header>
                                <Accordion.Body>
                                    <div>{item.country}</div>
                                    <div>{item.description}</div>
                                    <div>{item.address}</div>
                                    <div>{item.city} {item.zipcode}</div>

                                    <div>{item.phone}</div>
                                    <div>{item.website}</div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                ))}

                {allSuppliers.map((item) => (
                    <Col xs={12} sm={6} md={4}>
                        <Card className='text-center'>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.country}</Card.Text>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text>{item.address}</Card.Text>
                                <Card.Text>{item.city} {item.zipcode}</Card.Text>
                                <Card.Text>{item.phone}</Card.Text>
                                <Card.Text>{item.website}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}


                {allSuppliers.map((item) => (
                    <Col xs={12} sm={6} md={4}>
                        <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{item.name}</h5>
                            <p class="card-text">{item.country}</p>
                            <p class="card-text">{item.description}</p>
                            <p class="card-text">{item.address}</p>
                            <p class="card-text">{item.city} {item.zipcode}</p>
                            <p class="card-text">{item.phone}</p>
                            <p class="card-text">{item.website}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                        </div>
                    </div>
                    </div>
                    </Col>
                ))}

                    


                    {/* <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                        <Card.Img variant="top" src="holder.js/100px180" />
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                        </div>
                    </div>
                    </div> */}
            </Row>
        </Container>
    );
};
export default SuppliersListScreen;
