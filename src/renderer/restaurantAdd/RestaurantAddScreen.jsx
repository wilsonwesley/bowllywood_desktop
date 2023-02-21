import { useFormik } from 'formik';
import * as yup from 'yup';

import { addRestaurant } from '../../services/restaurants';
import InputText from '../../components/Input';
import Button from '../../components/Button';

import { Col, Row, Container } from 'react-bootstrap';

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

const RestaurantAddScreen = () => {
  
    const onSubmit = (values) => {
        console.log(values)
        addRestaurant(values)
            .then(() => {
                alert('Le restaurant a bien été ajouté');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const {values, errors, handleSubmit, handleChange, handleBlur, touched} =
        useFormik({
            initialValues: {
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
                                    value={values.country}
                                    placeholder="Ex: Fermé"
                                    error={
                                        errors.country && touched.country && errors.country
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
                                    value={values.country}
                                    placeholder="Ex: Fermé"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="mondayOpeningTime"
                                    desc="Lundi ouverture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="mondayClosingTime"
                                    desc="Lundi fermeture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="tuesdayOpeningTime"
                                    desc="Mardi ouverture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="tuesdayClosingTime"
                                    desc="Mardi fermeture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="wednesdayOpeningTime"
                                    desc="Mercredi ouverture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="wednesdayClosingTime"
                                    desc="Mercredi fermeture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="thursdayOpeningTime"
                                    desc="Jeudi ouverture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="thursdayClosingTime"
                                    desc="Jeudi fermeture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="fridayOpeningTime"
                                    desc="Vendredi ouverture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="fridayClosingTime"
                                    desc="Vendredi fermeture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='justify-content-center gap-4'>
                            <Col className="col-12 col-md-4 flex-center">
                                <InputText
                                    name="saturdayOpeningTime"
                                    desc="Samedi ouverture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 10h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                            <Col className="col-12 col-md-4 flex-center">
                            <InputText
                                    name="saturdayClosingTime"
                                    desc="Samedi fermeture *"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    placeholder="Ex: 23h"
                                    error={
                                        errors.country && touched.country && errors.country
                                    }
                                />
                            </Col>
                        </Row>
                        
                        
                        <Row>
                            <Col className='col-12 flex-center my-2'>
                                <Button type="submit">Ajouter</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>
   
    );
};
export default RestaurantAddScreen;