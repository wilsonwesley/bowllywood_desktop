
// import { Link, useParams } from 'react-router-dom';
import { getOneStock } from '../../services/stocks';
import { useEffect, useState } from 'react';
import { Col, Row, Container, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const StocksDetailScreen = () => {

    const [stockDetail, setStockDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    // let { id } = useParams();
    let { id } = '635141dd6d2bc0f9d6b8f38d';

    useEffect(() => {
        getOneStock(id)
        .then((res) => {
            setStockDetail(res.data);
            console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        !loading &&
        <>
            <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Ref</th>
                                    <th>Nom</th>
                                    <th>Quantité</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>   
                              <tr>
                                <td>{stockDetail.ref}</td>
                                <td>{stockDetail.name}</td>
                                <td>{stockDetail.quantity}</td>
                                <td>{stockDetail.type}</td>
                                <td>{stockDetail.status}</td>
                              </tr>
                            </tbody>
                        </Table>
                        <div className='d-flex justify-content-evenly'>
                            <Button className='text-dark'>
                                Ajouter
                                {/* <Link
                                    to={`/my-franchise-requests/edit/${id}`}
                                    className="text-decoration-none text-black text-center"
                                >
                                    <p>Mofidier</p>
                                </Link> */}
                            </Button>
                            <Button className='text-dark'>
                                Retirer
                                {/* <Link
                                    to={`/my-franchise-requests/cancel/${id}`}
                                    className="text-decoration-none text-black text-center"
                                >
                                    <p>Annuler</p>
                                </Link> */}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>



        {/* // ---------------------------------- */}


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
                <Col xs={4}>
                    <Card>
                        <Card.Img variant="top" src="lentilles.jpg" />
                        <Card.Body>
                            <Card.Title>{stockDetail.name}</Card.Title>
                            <Card.Text>{stockDetail.category}</Card.Text>
                            <Card.Text>{stockDetail.quantity + ' kg'}</Card.Text>
                            <Card.Text>{stockDetail.name}</Card.Text>
                            <Card.Text>{stockDetail.name}</Card.Text>
                            <Card.Text>{stockDetail.name}</Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>                      
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default StocksDetailScreen;
