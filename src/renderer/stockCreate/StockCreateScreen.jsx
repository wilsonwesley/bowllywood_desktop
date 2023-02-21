import { useFormik } from 'formik';
import * as yup from 'yup';

import { createStock } from '../../services/stocks';
import { AuthContext } from '../../contexts/AuthContext';
import InputText from '../../components/Input';
import Button from '../../components/Button';

import { useContext, useEffect, useState } from 'react';
import { Col, Row, Container, Form } from 'react-bootstrap';

import { getAllSuppliers } from './../../services/suppliers';


import './../../sass/styles.scss';

const validationSchema = yup.object({
    ref: yup.string().required('Ce champ est obligatoire'),
    name: yup.string().required('Ce champ est obligatoire'),
    quantity: yup.string().required('Ce champ est obligatoire'),
    quantityLimit: yup.string().required('Ce champ est obligatoire'),
    type: yup.string().required('Ce champ est obligatoire'),
    sheepmentDate: yup.date().required('Ce champ est obligatoire'),
    supplier: yup.string().required('Ce champ est obligatoire'),
    DLC: yup.date().required('Ce champ est obligatoire'),
    restaurantID: yup.string(),
    createdBy: yup.string(),
    lastUpdateBy: yup.string(),
});

const StockCreateScreen = () => {

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

    const authContext = useContext(AuthContext);
    // const userID = authContext.auth.userID;
    const userID = '632471120361eb66b468a627';

    const onSubmit = (values) => {
        console.log(values);
        createStock(values)
            .then(() => {
                alert('Ajout d\'ingrédient réussi');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const {values, errors, handleSubmit, handleChange, handleBlur, touched} =
        useFormik({
            initialValues: {
                ref: '',
                name: '',
                quantity: '',
                quantityLimit: '',
                type: '',
                sheepmentDate: '',
                supplier: '',
                DLC: '',
                restaurantID: '6392031336349a73320f2b1c',
                createdBy: userID,
                lastUpdateBy: userID,
            },
            validationSchema,
            onSubmit,
        });

    return (
        <Container>
            <Row>
            <Col className='col-12 flex-center'>
                    <img
                        src="/bowllywood.png"
                        alt="Logo du restaurant de bowls nommé Bowllywood"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <form onSubmit={handleSubmit}>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="ref"
                                    desc="Référence *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ref}
                                    placeholder="Ex: 9A9"
                                    error={
                                        errors.ref &&
                                        touched.ref &&
                                        errors.ref
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="name"
                                    desc="Produit *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Ex: Riz"
                                    error={
                                        errors.name && touched.name && errors.name
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="quantity"
                                    desc="Quantité *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.quantity}
                                    placeholder="Ex: 34.2"
                                    error={
                                        errors.quantity &&
                                        touched.quantity &&
                                        errors.quantity
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="quantityLimit"
                                    desc="Seuil limite *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.quantityLimit}
                                    placeholder="Ex: 20"
                                    error={
                                        errors.quantityLimit &&
                                        touched.quantityLimit &&
                                        errors.quantityLimit
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="DLC"
                                    desc="Date limite de consommation *"
                                    type="date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.DLC}
                                    error={
                                        errors.DLC &&
                                        touched.DLC &&
                                        errors.DLC
                                    }
                                />
                                 
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="sheepmentDate"
                                    desc="Date de livraison *"
                                    type="date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.sheepmentDate}
                                    error={
                                        errors.sheepmentDate &&
                                        touched.sheepmentDate &&
                                        errors.sheepmentDate
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-6 col-md-4 flex-center">
                                <Form.Select 
                                    className='form-control'
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.type &&
                                        touched.type &&
                                        errors.type
                                    }
                                >
                                        <option value="">Selectionner un type</option>
                                        <option value="RAW">Brut</option>
                                        <option value="TRANS">Transformé</option>
                                </Form.Select>
                            
                            </Col>
                            <Col className="col-6 col-md-4 flex-center">
                                <Form.Select 
                                    className='form-control'
                                    name="supplier"
                                    value={values.supplier}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.supplier &&
                                        touched.supplier &&
                                        errors.supplier
                                    }
                                >
                                    <option value="">Selectionner un fournisseur</option>
                                    {allSuppliers.map((item)=>(
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-12 flex-center my-2'>
                                <Button type="submit">Ajouter le produit</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};
export default StockCreateScreen;
