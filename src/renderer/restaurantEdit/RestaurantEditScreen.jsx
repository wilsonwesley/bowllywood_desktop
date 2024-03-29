import { useFormik } from 'formik';
import * as yup from 'yup';

import { editRestaurant, getRestaurantDetail } from '../../services/restaurants';

import InputText from '../../components/Input';

import { Col, Row, Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './../../sass/styles.scss';

const validationSchema = yup.object({
    address: yup.string().required('Ce champ est obligatoire'),
    phone: yup.string().required('Ce champ est obligatoire'),
    city: yup.string().required('Ce champ est obligatoire'),
    zipcode: yup.number().required('Ce champ est obligatoire'),
    email: yup
        .string()
        .email('La saisie est invalide.')
        .required('Ce champ est obligatoire'),
    district: yup.string(),
    latitude: yup.number(),
    longitude: yup.number(),
    pmrAccess: yup.bool().oneOf([true, false]),

    sundayOpeningTime: yup.string(),
    sundayClosingTime: yup.string(),
    mondayOpeningTime: yup.string(),
    mondayClosingTime: yup.string(),
    tuesdayOpeningTime: yup.string(),
    tuesdayClosingTime: yup.string(),
    wednesdayOpeningTime: yup.string(),
    wednesdayClosingTime: yup.string(),
    thursdayOpeningTime: yup.string(),
    thursdayClosingTime: yup.string(),
    fridayOpeningTime: yup.string(),
    fridayClosingTime: yup.string(),
    saturdayOpeningTime: yup.string(),
    saturdayClosingTime: yup.string(),
});

const RestaurantEditScreen = () => {
   
    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState(
        {
            address: '',
            phone: '',
            sundayOpeningTime: 'Fermé',
            sundayClosingTime: 'Fermé',
            mondayOpeningTime: '',
            mondayClosingTime: '',
            tuesdayOpeningTime: '',
            tuesdayClosingTime: '',
            wednesdayOpeningTime: '',
            wednesdayClosingTime: '',
            thursdayOpeningTime: '',
            thursdayClosingTime: '',
            fridayOpeningTime: '',
            fridayClosingTime: '',
            saturdayOpeningTime: '',
            saturdayClosingTime: '',
            city: '',
            zipcode: '',
            email: '',
            district: '',
            latitude: '',
            longitude: '',
            pmrAccess: '',
        }
    );

    let { id } = useParams();

    useEffect(() => {
        getRestaurantDetail(id)
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
        editRestaurant(values, id)
            .then(() => {
                alert('Modification du restaurant reussi');
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
                                    name="phone"
                                    desc="N° téléphone *"
                                    type="string"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    placeholder="Ex: 0322456789"
                                    error={
                                        errors.phone &&
                                        touched.phone &&
                                        errors.phone
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
                                        name="district"
                                        desc="Quartier *"
                                        type="string"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.district}
                                        placeholder="Ex: Centre-ville"
                                        error={
                                            errors.district &&
                                            touched.district &&
                                            errors.district
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
                                    placeholder="Ex:restaurant@restaurant.fr"
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
                            <Col md={6} className="d-flex justify-content-center">
                            <InputText
                                    name="pmrAccess"
                                    desc="Accès PMR"
                                    type="checkbox"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pmrAccess}
                                    error={
                                        errors.pmrAccess &&
                                        touched.pmrAccess &&
                                        errors.pmrAccess
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="sundayOpeningTime"
                                    desc="Dimanche ouverture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.sundayOpeningTime}
                                    placeholder="Ex: Fermé"
                                    error={
                                        errors.sundayOpeningTime && touched.sundayOpeningTime && errors.sundayOpeningTime
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="sundayClosingTime"
                                    desc="Dimanche fermeture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.sundayClosingTime}
                                    placeholder="Ex: Fermé"
                                    error={
                                        errors.sundayClosingTime && touched.sundayClosingTime && errors.sundayClosingTime
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="mondayOpeningTime"
                                    desc="Lundi ouverture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.mondayOpeningTime}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.mondayOpeningTime && touched.mondayOpeningTime && errors.mondayOpeningTime
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="mondayClosingTime"
                                    desc="Lundi fermeture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.mondayClosingTime}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.mondayClosingTime && touched.mondayClosingTime && errors.mondayClosingTime
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="tuesdayOpeningTime"
                                    desc="Mardi ouverture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.tuesdayOpeningTime}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.tuesdayOpeningTime && touched.tuesdayOpeningTime && errors.tuesdayOpeningTime
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="tuesdayClosingTime"
                                    desc="Mardi fermeture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.tuesdayClosingTime}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.tuesdayClosingTime && touched.tuesdayClosingTime && errors.tuesdayClosingTime
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="wednesdayOpeningTime"
                                    desc="Mercredi ouverture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.wednesdayOpeningTime}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.wednesdayOpeningTime && touched.wednesdayOpeningTime && errors.wednesdayOpeningTime
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="wednesdayClosingTime"
                                    desc="Mercredi fermeture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.wednesdayClosingTime}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.wednesdayClosingTime && touched.wednesdayClosingTime && errors.wednesdayClosingTime
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="thursdayOpeningTime"
                                    desc="Jeudi ouverture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.thursdayOpeningTime}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.thursdayOpeningTime && touched.thursdayOpeningTime && errors.thursdayOpeningTime
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="thursdayClosingTime"
                                    desc="Jeudi fermeture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.thursdayClosingTime}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.thursdayClosingTime && touched.thursdayClosingTime && errors.thursdayClosingTime
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="fridayOpeningTime"
                                    desc="Vendredi ouverture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fridayOpeningTime}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.fridayOpeningTime && touched.fridayOpeningTime && errors.fridayOpeningTime
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="fridayClosingTime"
                                    desc="Vendredi fermeture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fridayClosingTime}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.fridayClosingTime && touched.fridayClosingTime && errors.fridayClosingTime
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="saturdayOpeningTime"
                                    desc="Samedi ouverture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.saturdayOpeningTime}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.saturdayOpeningTime && touched.saturdayOpeningTime && errors.saturdayOpeningTime
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="saturdayClosingTime"
                                    desc="Samedi fermeture *"
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.saturdayClosingTime}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.saturdayClosingTime && touched.saturdayClosingTime && errors.saturdayClosingTime
                                    }
                                />
                            </Col>
                        </Row>
                        
                        
                        <Row>
                            <Col className='col-12 flex-center my-2'>
                                <Button type="submit" className="text-dark">Modifier</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};
export default RestaurantEditScreen;
