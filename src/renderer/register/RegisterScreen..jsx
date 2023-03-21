import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Col, Row, Container, Form } from 'react-bootstrap';
import { register } from '../../services/users';
import { getAllRestaurants } from './../../services/restaurants';

import { useEffect, useState } from 'react';

const validationSchema = yup.object({
    firstName: yup.string().required('Ce champ est obligatoire'),
    lastName: yup.string().required('Ce champ est obligatoire'),
    email: yup
        .string('Ce champ est obligatoire')
        .email('La saisie est invalide.')
        .required('Ce champ est obligatoire'),
    password: yup.string().required('Ce champ est obligatoire'),
    passwordConfirm: yup
        .string()
        .required('Ce champ est obligatoire')
        .oneOf(
            [yup.ref('password'), null],
            'Les mots de passes ne correspondent pas.'
        ),
    userRole: yup.string().required('Ce champ est obligatoire'),
    workingRestaurant_id: yup.string().required('Ce champ est obligatoire'),
});

function RegisterScreen() {

    const [allRestaurants, setAllRestaurants] = useState([]);
    useEffect(() => {
        getAllRestaurants()
            .then((res) => {
                setAllRestaurants(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onSubmit = (values) => {
        delete values.passwordConfirm;
        register(values).then(()=>{
            console.log('Création succes')
        }).catch(err => {
            console.log(err)
        })
    };

    const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
        useFormik({
            initialValues: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirm: '',
                userRole: '',
            },
            validationSchema,
            onSubmit,
        });

    return (
        <Container className="pb-5">
            <Row className="flex-center">
                <Col lg="3">
                    <img
                        src="Bowllywood.png"
                        alt="Logo du restaurant de bowls nommé Bowllywood"
                    />
                </Col>
                <Col lg="6">
                    <p className="logoText">
                        T'inscrire sur notre site te permettra de gérer ton
                        espace fidélité et d'avoir une traçabilité de tes
                        réservations
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="container"
                    >
                        <Row className="justify-content-center">
                            <Col
                                lg="4"
                                className="d-flex justify-content-center px-4"
                            >
                                <Input
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                    desc="Tape ton prénom"
                                    placeholder="Jean"
                                    error={
                                        errors.firstName &&
                                        touched.firstName &&
                                        errors.firstName
                                    }
                                />
                            </Col>
                            <Col
                                lg="4"
                                className="d-flex justify-content-center px-4"
                            >
                                <Input
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    desc="Et ton nom de famille"
                                    placeholder="Bon"
                                    error={
                                        errors.lastName &&
                                        touched.lastName &&
                                        errors.lastName
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col
                                lg="4"
                                className="d-flex justify-content-center px-4"
                            >
                                <Input
                                    type="date"
                                    name="birthday"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    desc="Quand es-tu né?"
                                    error={
                                        errors.birthDate &&
                                        touched.birthDate &&
                                        errors.birthDate
                                    }
                                />
                            </Col>
                            <Col
                                lg="4"
                                className="d-flex justify-content-center px-4"
                            >
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    desc="Donnes-nous ton adresse mail?"
                                    placeholder="jbon@herta.fr"
                                    error={
                                        errors.email &&
                                        touched.email &&
                                        errors.email
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className="justify-content-center mb-4">
                            <Col
                                lg="4"
                                className="d-flex justify-content-center px-4"
                            >
                                <Input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    desc="Choisis un mot de passe"
                                    placeholder="********"
                                    error={
                                        errors.password &&
                                        touched.password &&
                                        errors.password
                                    }
                                />
                            </Col>
                            <Col
                                lg="4"
                                className="d-flex justify-content-center px-4"
                            >
                                <Input
                                    type="password"
                                    name="passwordConfirm"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    desc="Confirme ton mot de passe"
                                    placeholder="********"
                                    error={
                                        errors.passwordConfirm &&
                                        touched.passwordConfirm &&
                                        errors.passwordConfirm
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className='justify-content-center gap-4'>
                            <Col className="col-4 mb-5">
                                <Form.Select 
                                    className='form-control'
                                    name="userRole"
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.type &&
                                        touched.type &&
                                        errors.type
                                    }
                                >
                                        <option value="">Selectionner un rôle</option>
                                        <option value="ROLE_USER">Utilisateur</option>
                                        <option value="ROLE_WAITER">Serveur</option>
                                        <option value="ROLE_MANAGER">Manager</option>
                                        <option value="ROLE_COOK">Cuisinier</option>
                                        <option value="ROLE_CEO">Directeur</option>
                                        <option value="ROLE_ADMIN">Administrateur</option>
                                        <option value="ROLE_SUPERADMIN">Super administrateur</option>
                                </Form.Select>
                            </Col>
                            <Col className="col-4 mb-5">
                                <Form.Select 
                                    className='form-control'
                                    name="workingRestaurant_id"
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.type &&
                                        touched.type &&
                                        errors.type
                                    }
                                >
                                        <option value="">Selectionner un restaurant</option>
                                    {allRestaurants.map((item)=>(
                                        
                                        <option key={item._id} value={item._id}>{item.city} - {item.address}</option>
                                    ))}
                                </Form.Select>
                            
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button type="submit" className="">Enregistrer</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterScreen;
