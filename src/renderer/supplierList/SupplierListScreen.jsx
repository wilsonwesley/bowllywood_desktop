import { getAllSuppliers } from './../../services/suppliers';
import { useEffect, useState } from 'react';

import { Col, Row, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Button from '../../components/Button';
import Button from 'react-bootstrap/Button';

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
                        <Button className='text-dark'> Ajouter un fournisseur</Button>
                    </Link>
                </Col>
            </Row>
            <Row>    
                {allSuppliers.map((item) => (
                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-md-2 flex-center">
                            <Card.Img variant="top" src="bowllywood.png" />
                            </div>
                            <div class="col-md-10">
                                <div class="card-body">
                                    <h5 class="card-title">{item.name}</h5>
                                    <p class="card-text">{item.country}</p>
                                    <p class="card-text">{item.description}</p>
                                    <p class="card-text">{item.phone}</p>
                                    <p class="card-text">{item.website}</p>
                                    <p class="card-text"><small class="text-muted">{item.city} {item.zipcode}</small></p>
                                    <Row>
                                        <Col className='text-center mb-4'>
                                            <Link
                                                 to={`/suppliers/${item._id}`}
                                                className="text-decoration-none text-black text-center"
                                                >
                                                <Button className='text-dark'>Consulter</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Row>
        </Container>
    );
};
export default SuppliersListScreen;
