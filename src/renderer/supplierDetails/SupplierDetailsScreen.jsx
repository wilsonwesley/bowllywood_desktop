
import { Link, useParams } from 'react-router-dom';
import { getSupplierDetail } from '../../services/suppliers';
import { useEffect, useState } from 'react';
import { Col, Row, Container, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const SupplierDetailsScreen = () => {

    const [supplierDetail, setSupplierDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        getSupplierDetail(id)
        .then((res) => {
            setSupplierDetail(res.data);
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
                    <div class="card mb-3">
                        <div class="row no-gutters">
                            <div class="col-md-12 text-center">
                                <div class="card-body">
                                    <h5 class="card-title">{supplierDetail.name}</h5>
                                    <p class="card-text">{supplierDetail.country}</p>
                                    <p class="card-text">{supplierDetail.description}</p>
                                    <p class="card-text">{supplierDetail.phone}</p>
                                    <p class="card-text">{supplierDetail.website}</p>
                                    <p class="card-text"><small class="text-muted">{supplierDetail.city} {supplierDetail.zipcode}</small></p>
                                    <p class="card-text">{supplierDetail.latitude}</p>
                                    <p class="card-text">{supplierDetail.longitude}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                            <Button className=''>
                                <Link
                                    to={`/supplierList`}
                                    className="text-decoration-none text-center"
                                >
                                    <p>Retour à la liste</p>
                                </Link>
                            </Button>
                        </div>   
                        
                    </Col>
                </Row>   
            </Container>
    );
};

export default SupplierDetailsScreen;
