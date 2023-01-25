import { getAllstock } from './../../services/stocks';
import { useEffect, useState } from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';


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
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
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
                                        <tr
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
