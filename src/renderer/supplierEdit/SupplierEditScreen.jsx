import { useFormik } from 'formik';
import * as yup from 'yup';

import { editSupplier, getSupplierDetail } from '../../services/suppliers';
import InputText from '../../components/Input';
import Button from '../../components/Button';

import { Col, Row, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './../../sass/styles.scss';

const validationSchema = yup.object({
    name: yup.string().required('Ce champ est obligatoire'),
    country: yup.string().required('Ce champ est obligatoire'),
    address: yup.string().required('Ce champ est obligatoire'),
    description: yup.string().required('Ce champ est obligatoire'),
    city: yup.string().required('Ce champ est obligatoire'),
    zipcode: yup.number().required('Ce champ est obligatoire'),
    phone: yup.number().required('Ce champ est obligatoire'),
    email: yup
        .string()
        .email('La saisie est invalide.')
        .required('Ce champ est obligatoire'),
    website: yup.string(),
    latitude: yup.number(),
    longitude: yup.number(),
    imagePath: yup.string(),
});

const SupplierEditScreen = () => {
   
    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState(
        {
            name: '',
            country: '',
            address: '',
            description: '',
            city: '',
            zipcode: '',
            phone: '',
            email: '',
            website: '',
            latitude: '',
            longitude: '',
            imagePath: '',
        }
    );

    let { id } = useParams();

    useEffect(() => {
        getSupplierDetail(id)
            .then((res) => {
                setInitialValues(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const onSubmit = (values) => {
        console.log(values);
        editSupplier(values, id)
            .then(() => {
                alert('Modification du fournisseur reussi');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
        useFormik({
            initialValues,
            validationSchema,
            onSubmit,
            enableReinitialize: true
        });


    return (
        !loading &&
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
                                    name="name"
                                    desc="Nom *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    placeholder="Ex: Bowllywood SAS"
                                    error={
                                        errors.name &&
                                        touched.name &&
                                        errors.name
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="country"
                                    desc="Pays *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: France"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="address"
                                    desc="Adresse *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    placeholder="Ex: 666 Avenue de l'Atlantide"
                                    error={
                                        errors.address &&
                                        touched.address &&
                                        errors.address
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="website"
                                    desc="Site internet"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.website}
                                    placeholder="Ex: fournisseur.com"
                                    error={
                                        errors.website &&
                                        touched.website &&
                                        errors.website
                                    }
                                />


                                
                            </Col>
                        </Row>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="city"
                                    desc="Ville *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    placeholder="Ex: Montpellier"
                                    error={
                                        errors.city &&
                                        touched.city &&
                                        errors.city
                                    }
                                />
                                 
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="zipcode"
                                    desc="Code postal *"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.zipcode}
                                    placeholder="Ex: 34000"
                                    error={
                                        errors.zipcode &&
                                        touched.zipcode &&
                                        errors.zipcode
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-6 col-md-4 flex-center">
                                <InputText
                                        name="phone"
                                        desc="N° téléphone *"
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        placeholder="Ex: 0322334455"
                                        error={
                                            errors.phone &&
                                            touched.phone &&
                                            errors.phone
                                        }
                                    />
                            </Col>
                            <Col className="col-6 col-md-4 flex-center">
                                <InputText
                                    name="email"
                                    desc="Adresse email *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Ex:founisseur@founisseur.fr"
                                    error={
                                        errors.email &&
                                        touched.email &&
                                        errors.email
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-6 col-md-4 flex-center">
                                <InputText
                                        name="latitude"
                                        desc="Latitude"
                                        type="number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.latitude}
                                        placeholder="Ex: 48.8421"
                                        error={
                                            errors.latitude &&
                                            touched.latitude &&
                                            errors.latitude
                                        }
                                    />
                            </Col>
                            <Col className="col-6 col-md-4 flex-center">
                                <InputText
                                    name="longitude"
                                    desc="Longitude"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.longitude}
                                    placeholder="Ex: 2.3220"
                                    error={
                                        errors.longitude &&
                                        touched.longitude &&
                                        errors.longitude
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                            <FloatingLabel controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                    as="textarea"
                                    style={{ width: '600px', height: '100px'}}
                                    name="description"
                                    desc="Description *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    placeholder="Ex: Description de la société"
                                    error={
                                        errors.description &&
                                        touched.description &&
                                        errors.description
                                    }
                                />
                            </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='col-12 flex-center my-2'>
                                <Button type="submit">Modifier</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};
export default SupplierEditScreen;
