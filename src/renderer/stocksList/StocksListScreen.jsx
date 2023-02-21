import { getAllstock } from './../../services/stocks';
import { useEffect, useState } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const StocksListScreen = () => {

    const [allStocks, setAllStocks] = useState([]);
    useEffect(() => {
        getAllstock()
            .then((res) => {
                setAllStocks(res.data);
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
                        to={`/stocks/create`}
                        className="text-decoration-none text-black text-center"
                        >
                        <Button className='text-dark'> Créer un nouveau produit</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <th>Ref</th>
                                <th>Produit</th>
                                <th>Saveur</th>
                                <th>Quantité</th>
                                <th>Seuil limite</th>
                                <th>Status</th>
                                <th>DLC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allStocks.map(
                                (item) => {
                                    return (
                                        <tr className='text-center'
                                            key={item._id}>
                                            <td>
                                                {item.ref}
                                            </td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                {item.category}
                                            </td>
                                            <td>
                                                {item.quantity}
                                            </td>
                                            <td>
                                                {item.quantityLimit}
                                            </td>
                                            <td>
                                                {item.status}
                                            </td>
                                            <td>
                                                {item.DLC}
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/stocks/supply/${item._id}`}
                                                    className="text-decoration-none text-black text-center"
                                                    >
                                                    <Button className='text-light'>Ajouter</Button>
                                                </Link>
                                                <Link
                                                    to={`/stocks/extract/${item._id}`}
                                                    className="text-decoration-none text-black text-center"
                                                    >
                                                    <Button className='text-light my-2'> Retirer</Button>
                                                </Link>
                                                <Link
                                                    to={`/stocks/delete/${item._id}`}
                                                    className="text-decoration-none text-black text-center"
                                                    >
                                                    <Button className='text-light bg-danger'>Suprimer</Button>
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
export default StocksListScreen;
