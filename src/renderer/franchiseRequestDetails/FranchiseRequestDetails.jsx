
import { Link, useParams } from 'react-router-dom';
import { getFranchiseRequestDetail } from './../../services/franchiseRequests';
import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const FranchiseRequestDetailsScreen = () => {

    const [franchiseRequestDetail, setFranchiseRequestDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        getFranchiseRequestDetail(id)
        .then((res) => {
            setFranchiseRequestDetail(res.data);
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
            <Container>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr className='text-center'>
                                    <th>Référence</th>
                                    <th>Montant estimé</th>
                                    <th>Financement envisagé</th>
                                    <th>Ville</th>
                                    <th>Implantation</th>
                                    <th>N° téléphone</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>   
                              <tr className='text-center'>
                                <td>
                                    {
                                        franchiseRequestDetail.city + '-' + franchiseRequestDetail._id.substr(13, 10) + '-' + franchiseRequestDetail.shopLocation
                                    }
                                </td>
                                <td>{franchiseRequestDetail.estimatedAmount}</td>
                                <td>{franchiseRequestDetail.hopedFinancing}</td>
                                <td>{franchiseRequestDetail.city}</td>
                                <td>{franchiseRequestDetail.shopLocation}</td>
                                <td>{franchiseRequestDetail.phone}</td>
                                <td>{franchiseRequestDetail.status}</td>
                              </tr>
                            </tbody>
                        </Table>
                        <div className='d-flex justify-content-center'>
                            <Button className='m-4'>
                                <Link
                                    to={`/franchise-requests/accepted/${id}`}
                                    className="text-decoration-none text-center"
                                >
                                    <p>Accepter</p>
                                </Link>
                            </Button>
                            <Button className='m-4 bg-danger'>
                                <Link
                                    to={`/franchise-requests/refused/${id}`}
                                    className="text-decoration-none text-center"
                                >
                                    <p>Refuser</p>
                                </Link>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
    );
};

export default FranchiseRequestDetailsScreen;
