import './bowl.scss';
// hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// data
import { createMeal, updateMeal, getOneMeal } from '../../services/bowl';
import { getAllstock } from '../../services/stocks';
import { imgurUpload } from '../../services/imgur';
import { useFormik } from 'formik';
import { errorHandler } from '../../utils/errorHandler';
import * as yup from 'yup';
// front
import { Col, Row, Container } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner';
import CustomMultiSelect from '../../components/CustomMultiSelect';
import ThinHeader from '../../components/ThinHeader';
import Button from '../../components/Button';
import Input from '../../components/Input';

const categories = [{_id: 'SALE', label: 'Salé'}, {_id: 'SUCRE', label: 'Sucré'}],
      FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];

const BowlForm = ({action='ADD'}) => {
// [selectedIngredients, setSelectedIngredients] = useState([]),
    const [ingredients, setIngredients] = useState([]),
          [bowl, setBowl] = useState({}),
          [imgError, setImgError] = useState(false),
          [isLoaded, setIsLoaded] = useState(false),
          [imageUploading, setImageUploading] = useState(false),
          [initialImage, setInitialImage] = useState(false),
          // [uploaded, setUploaded] = useState(false),
          [selectedIngredients, setSelectedIngredients] = useState(['635141dd6d2bc0f9d6b8f38b']),
          [bowlImage, setBowlImage] = useState(null),
          [ingredientsLoaded, setIngredientsLoaded] = useState(false);

    const navigate = useNavigate(),
          { id } = useParams(), 
          bowlID = id; // bowlID = useParams().id
    const editMode = (bowlID || action === 'EDIT') ? true : false;

    let formData;

    // formik
    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Ce champ est obligatoire'),
    
        category: yup
            .string()
            .oneOf(['SUCRE', 'SALE'], 'La catégorie doit être "sucré" ou "salé" seulement')
            .required('Ce champ est obligatoire'),
    
        price: yup
            .string()
            .required('Ce champ est obligatoire'),
    
        description: yup
            .string()
            .required('Ce champ est obligatoire')
            .min(10, "Une description trop petite n'est pas très attrayant... Minimum 10 caractères.")
            .max(255, "Oups ! La description est trop longue... Raccoucissez un peu. Maximum 255 caractères."),
    
        ingredients: yup
            .array()
            .required('Veuillez sélectionner au moins un élément.'),
    
        image: yup
            .mixed()
            .required('Veuillez sélectionner insérer une image.')
    })

    const onSubmit = async (values) => {
        let imgurUploaded = false;

        setImageUploading(true)
        if (!editMode || (editMode && bowlImage)) {
            try
            {
                imgurUploaded = await imgurUpload(bowlImage)
                if (imgurUploaded)
                {
                    values.image = imgurUploaded.data.data.link;
                }
            }
            catch(err)
            {
                if (err.code === "ERR_NETWORK") {
                    err.code = 'réseau'
                    err.message = "Êtes-vous connecté en localhost ? L'upload est impossible sur cet hôte. Sinon, vérifiez votre connexion internet."
                }
                else
                {
                    err.message = "L'image n'a pas pu être téléchargée. Veuillez recommencer."
                }

                errorHandler('TOAST', err, 'Téléchargement de l\'image : ')
                setImageUploading(false)
            }
        } else if (editMode && !bowlImage) {
            imgurUploaded = true
        }

        if (imgurUploaded) {
            let ingredientsID = []
            selectedIngredients.forEach((item)=>{
                if (typeof item === 'string') {
                    ingredientsID.push(item);
                } else {
                    ingredientsID.push(item.id);
                }
            })
            values.ingredients = ingredientsID;

            // add the currency caractere
            values.price = values.price.trim();
            let priceCurr = values.price.charAt(values.price.length -1);
            values.price = (priceCurr !== '€') ? values.price + '€' : values.price;

            if (editMode)
            {
                updateMeal(bowlID, values).then((res)=>{
                    navigate(`/menus/${bowlID}`, {replace: true})
                }).catch((err) => {
                    errorHandler('TOAST', err)
                }).finally(()=>{
                    setImageUploading(false)
                })
            }
            else
            {
                createMeal(values).then((res)=>{
                    navigate(`/menus/${res.data._id}`, {replace: true})
                }).catch((err) => {
                    errorHandler('TOAST', err)
                }).finally(()=>{
                    setImageUploading(false)
                })
            }
        }

    }

    const { values, errors, handleSubmit, handleChange, setFieldValue, setErrors} = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: bowl.name ?? '',
            category: bowl.category ?? 'SALE',
            price: bowl.price ?? '',
            description: bowl.description ?? '',
            ingredients: selectedIngredients ?? [],
            image: bowl.image ?? undefined
        },
        validationSchema,
        onSubmit
    })

    // get data
    useEffect(()=>{
        let cleaning = false;

        if (editMode)
        {
            getOneMeal(bowlID).then((res)=>{
                if (cleaning) return; 
                setSelectedIngredients(res.data?.ingredients)
                setInitialImage(res.data?.image)
                setBowl(res.data)
            }).catch((err)=>{
                errorHandler('TOAST', err)
            }).finally(()=>{
                setIsLoaded(true)
            })
        }

        getAllstock().then((res)=>{
            if (cleaning) return; 

            let stockArr = []
            res.data.forEach((stock)=>{
                stockArr.push({
                    id: stock._id, 
                    label: stock.name
                })
            })

            setIngredients(stockArr);

        }).catch((err)=>{
            errorHandler('TOAST', err)
        }).finally(()=>{
            setIngredientsLoaded(true)
        })

        return () => {
            cleaning = true;
        }
    }, [editMode, bowlID])

    const handleFileInput = ({target}) => {
        let file = target?.files[0];

        if (!FORMATS.includes(file?.type))
        {
            setErrors({ ...errors, image: 'Le format d\'image est invalide.' })
            setBowlImage(null)
            return
        }

        /*if (file?.size >= 1024 * 2048) {
            setErrors({ ...errors, image: 'Le fichier est trop lourd. 5MB maximum.' })
            setBowlImage('')
            return
        }*/

        formData = new FormData();
        formData.append('image', file);
        setBowlImage(formData)

        setFieldValue('image', file.name);
    }

    const FileBowlLabel = () => {
        if (!editMode || !bowl?.image) {
            return 'Image de présentation du bowl'
        } else {
            return (
                <>
                Image de présentation du bowl. <br/><span>Fichier actuel : {values?.image}</span>
                </>
            )
        }
    }

    return (
    <Container className="bowlCtnr d-flex flex-column px-5 pt-4 pb-5">
        <ThinHeader subTitle={(!editMode) ? 'Creation d\'un nouveau bowl' : `Modifier le bowl ${values.name}` } />
        <Row>
            <Col> {(!editMode || isLoaded) ?
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="container bowlForm">
                    <Row className="justify-content-around">
                        <Col md={8} lg={6} xl={5} className="d-flex justify-content-center px-4">
                            <Input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                desc="Nom du bowl"
                                placeholder="Bâptisez-le..."
                                error={errors.name}
                            />
                        </Col>
                        <Col md={8} lg={6} xl={5} className="d-flex justify-content-center px-4">

                            <div className="inputCtnr w-100 px-0 my-3">
                                <label htmlFor="category" className="w-100">Catégorie</label>
                                <select 
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    className="selectField rw-widget-input rw-widget-picker rw-widget-container w-100 py-2 pl-3">
                                    { 
                                        categories.map((item, index)=> (
                                            <option 
                                                key={index} 
                                                value={item._id}
                                                defaultValue='SALE'
                                                >{item.label}</option>  
                                        ))
                                    }
                                </select>
                                <p className="error">{errors.category}</p>
                            </div>

                        </Col>
                    </Row>
                    <Row className="justify-content-around">
                        <Col md={8} lg={6} xl={5} className="d-flex justify-content-center px-4">
                            <Input
                                type="text"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                desc="Prix du bowl"
                                placeholder="17,5€"
                                error={errors.price}
                            />
                        </Col>
                        <Col md={8} lg={6} xl={5} className="d-flex flex-column bowlFile justify-content-center px-4">
                            <Input
                                name="image"
                                type="file"
                                onChange={handleFileInput}
                                desc={<FileBowlLabel />}
                                error={errors.image}
                            />
                        </Col>
                    </Row>
                    <Row className="multiSelectCtnr justify-content-around">
                        <Col md={8} lg={6} xl={5} className="inputCtnr">
                            <CustomMultiSelect
                                name="ingredients"
                                desc="Sélectionnez les ingrédients"
                                onChange={(selected)=>{
                                    if (selected)
                                    {
                                        setSelectedIngredients(selected)
                                    }
                                }}
                                value={selectedIngredients}
                                error={errors.ingredients}
                                data={ingredients}
                                dataKey="id"
                                textField="label"
                                placeholder={(ingredients.length > 0) ? 'Riz, tomates...' : "Aucun ingrédient n'a pu être retrouvés"}
                                disabled={(ingredients.length === 0)}
                                busy={!ingredientsLoaded}
                            />
                        </Col>
                        <Col md={8} lg={6} xl={5} className="inputCtnr">
                            <CustomMultiSelect
                                // name="allergenes"
                                desc="Sélectionnez les allergènes présents"
                                onChange={(selected)=>{
                                    if (selected)
                                    {
                                        setFieldValue('allergenes', selected);
                                    }
                                }}
                                // value={values?.allergenes}
                                // error={errors.allergenes}
                                data={[]}
                                dataKey="id"
                                textField="label"
                                placeholder="La section allergène sera bientôt disponible"
                                disabled />
                        </Col>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                        {
                            (editMode)
                            ? <Col xs={9} md={2} lg={3}>
                               {(!imgError)
                                   ? <img
                                        src={initialImage}
                                        alt={values?.name}
                                        onError={(event) => {
                                            let err = {
                                                code: '',
                                                message: "L'image du bowl n'a pas pu être récupérée."
                                            }
                                            errorHandler('TOAST', err)
                                            setImgError(true)
                                        }}
                                        referrerPolicy="no-referrer"
                                        className="img-fluid"/>
                                   : <img 
                                        src="/bowlicon_grey.png"
                                        alt='Bowllywood default icon'
                                        referrerPolicy="no-referrer"
                                        className="img-fluid" />
                                }
                            </Col>
                            : ''
                        }
                        <Col lg={9}>
                            <div className="inputCtnr textMeal d-flex flex-column align-items-center w-100 px-0 my-3">
                                <label htmlFor="Description" className="w-100">Description</label>
                                <textarea
                                    rows="10"
                                    type="text"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder="Donnez une description clair et captivante"
                                    className="rounded w-100 p-3"
                                />
                                <p className="error">{errors.description}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Button type="submit" onClick={handleSubmit}>
                            <div className="d-flex align-items-center justify-content-around ">
                                <span>Soumettre</span>
                                {(imageUploading) ? <LoadingSpinner /> : '' }
                            </div>
                        </Button>
                    </Row>
                </form>
                : <LoadingSpinner />}
            </Col>
        </Row>
    </Container>
  )
}

export default BowlForm;