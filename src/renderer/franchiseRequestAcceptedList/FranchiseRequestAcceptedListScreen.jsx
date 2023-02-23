import { getAllAcceptedFranchiseRequests } from './../../services/franchiseRequests';
import { useEffect, useState } from 'react';

import { Col, Row, Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FranchiseRequestsAcceptedListScreen = () => {

    const [allAcceptedFranchiseRequests, setAllAcceptedFranchiseRequests] = useState([]);
    useEffect(() => {
        getAllAcceptedFranchiseRequests()
            .then((res) => {
                setAllAcceptedFranchiseRequests(res.data);
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
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <th>Date de création</th>
                                <th>Montant estimé</th>
                                <th>Financement envisagé</th>
                                <th>Ville d'implantation</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAcceptedFranchiseRequests.map(
                                (item) => {
                                    return (
                                        <tr className='text-center'
                                            key={item._id}>
                                            <td>
                                                {item.createdAt}
                                            </td>
                                            <td>
                                                {item.estimatedAmount + ' €'}
                                            </td>
                                            <td>
                                                {item.hopedFinancing + ' €'}
                                            </td>
                                            <td>
                                                {item.shopLocation}
                                            </td>
                                            <td>
                                                {item.status}
                                            </td>
                                            <td>   
                                                 <Link
                                                        to={`/franchise-requests/${item._id}`}
                                                        className="text-decoration-none text-black text-center"
                                                    >
                                                <Button className='text-dark'>Consulter</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col className='text-center mb-4'>
                    <Link
                        to={`/franchiseRequestsList`}
                        className="text-decoration-none text-black text-center"
                        >
                        <Button className='text-dark'>Retour à la liste</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};
export default FranchiseRequestsAcceptedListScreen;
