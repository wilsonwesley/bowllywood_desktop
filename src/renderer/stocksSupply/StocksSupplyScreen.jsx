import { useFormik } from 'formik';
import * as yup from 'yup';
import { supplyStock } from '../../services/stocks';
import { AuthContext } from '../../contexts/AuthContext';
import InputText from '../../components/Input';
import Button from '../../components/Button';

import { useContext, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import './../../sass/styles.scss';

const validationSchema = yup.object({
    quantity: yup.string().required('Ce champ est obligatoire'),
});

const StocksSupplyScreen = () => {

    // const authContext = useContext(AuthContext);
    // const userID = authContext.auth.userID;


    const [initialValues, setInitialValues] = useState(
        {
            quantity: '',
        }
    );

    let { id } = useParams();

    const onSubmit = (values) => {
        console.log(values);
        supplyStock(values, id)
            .then(() => {
                alert('L\'ajout du stock à bien été mis à jours');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const {values, errors, handleSubmit, handleChange, handleBlur, touched} =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit,
            // enableReinitialize: true
        });

    return (
        <Container>
            <Row>
                <Col className='col-12 flex-center pt-5'>
                    <img
                        src="bowllywood.png"
                        alt="Logo du restaurant de bowls nommé Bowllywood"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit}>
                        <Row className='justify-content-center gap-4 pt-5'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="quantity"
                                    desc="Quantité à ajouter en kg *"
                                    type="string"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.quantity}
                                    placeholder="Ex: 40"
                                    error={
                                        errors.quantity &&
                                        touched.quantity &&
                                        errors.quantity
                                    }
                                />
                            </Col>
                           
                        </Row>
                       
                        <Row className='justify-content-center gap-4'>
                            <Col className='col-6 col-md-4 flex-center mb-5'>
                                <Button type="submit">Ajouter au stock</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};
export default StocksSupplyScreen;
