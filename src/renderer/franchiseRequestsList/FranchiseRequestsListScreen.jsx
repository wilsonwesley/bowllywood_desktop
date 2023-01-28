import { getAllFranchiseRequests } from './../../services/franchiseRequests';
import { useEffect, useState } from 'react';

import { Col, Row, Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FranchiseRequestsListScreen = () => {

    const [allFranchiseRequests, setAllFranchiseRequests] = useState([]);
    useEffect(() => {
        getAllFranchiseRequests()
            .then((res) => {
                setAllFranchiseRequests(res.data);
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
                            {allFranchiseRequests.map(
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

        </Container>
    );
};
export default FranchiseRequestsListScreen;
