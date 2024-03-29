import { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import InputText from '../../components/Input';
// import Button from '../../components/Button';
import { Col, Row, Container, Button } from 'react-bootstrap';
import './LoginScreen.scss';
import { loginUser } from '../../services/users';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import jwt_decode from "jwt-decode";
import { errorHandler } from '../../utils/errorHandler';
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Une adresse mail est requise pour se connecter!')
        .email("Ce n'est pas une adresse mail valide!"),
    password: yup
        .string()
        .required('Un mot de passe est obligatoire pour se connecter!')
        .min(6, 'Le mot de passe est trop court'),
});

function LoginScreen() {
    
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const redirectSource = location.state?.from?.pathname || '/home';

    const [errorMessage, setErrorMessage] = useState('');
    const authContext = useContext(AuthContext);
    return (
        <Formik
            validationSchema={loginSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values) => {
                try {
                    const response = await loginUser(values);

                    const decodedToken = jwt_decode(response.data.token),
                          userRole = decodedToken?.roleID ?? '';

                    if (userRole === 'ROLE_USER') {
                        let err = {
                            code: '',
                            message: 'La connexion est impossible. Veuillez réessayer.'
                        }
                        errorHandler('TOAST', err)
                        return
                    }

                    localStorage.setItem(
                        'userTokens',
                        JSON.stringify(response.data)
                    );

                    authContext.setAuth(JSON.stringify(response.data));
                    navigate(redirectSource, { replace: true });
                } catch (err) {
                    if (!err.response) {
                        setErrorMessage('Pas de réponse du serveur');
                    } else if (err.response.status === 422) {
                        setErrorMessage('Identifiant/Mot de passe incorrect');
                    } else if (err.response.status === 403) {
                        setErrorMessage(
                            'Compte non validé, avez-vous pensé à vérifier votre boîte mail?'
                        );
                    } else {
                        setErrorMessage(
                            'Connexion impossible, veuillez réessayer ultérieurement'
                        );
                    }
                }
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <Container className="pb-5">
                    <Row className="flex-center mb-5">
                        <Col lg="3">
                            <img
                                src="Bowllywood.png"
                                alt="Logo du restaurant de bowls nommé Bowllywood"
                            />
                        </Col>
                        <Col lg="6">
                            <p className="loginText">
                                Te connecter sur notre site te permettra de
                                gérer ton espace fidélité et d’avoir une
                                traçabilité de tes réservations
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
                                <Row className="justify-content-center gap-4 mb-5">
                                    <Col
                                        lg="4"
                                        className="d-flex justify-content-center px-4"
                                    >
                                        <InputText
                                            error={
                                                errors.email &&
                                                touched.email &&
                                                errors.email
                                            }
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            placeholder="jbon@herta.fr"
                                            desc="Email"
                                            id="email"
                                        />
                                    </Col>
                                    <Col
                                        lg="4"
                                        className="d-flex justify-content-center px-4"
                                    >
                                        <InputText
                                            error={
                                                errors.password &&
                                                touched.password &&
                                                errors.password
                                            }
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            desc="Mot de passe"
                                            placeholder="********"
                                        />
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center">
                                    <Button type="submit" className="text-dark">Connexion</Button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            )}
        </Formik>
    );
}

export default LoginScreen;
