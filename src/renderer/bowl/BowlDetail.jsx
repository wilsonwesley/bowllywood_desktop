import './bowl.scss';
// hooks
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// data
import { getOneMeal, deleteMeal } from '../../services/bowl';
import { getOneStock } from '../../services/stocks';
import { errorHandler } from '../../utils/errorHandler';
import jwt_decode from "jwt-decode";
// front
import { Col, Row, Container } from 'react-bootstrap';
import ThinHeader from '../../components/ThinHeader';
import LoadingSpinner from '../../components/LoadingSpinner';

const BowlDetail = () => {
   const [bowl, setBowl] = useState(null),
         [isAdmitted, setIsAdmitted] = useState(false),
         [isLoaded, setIsLoaded] = useState(false),
         [ingredientsLoaded, setIngredientsLoaded] = useState(false),
         [ingredients, setIngredients] = useState([]);

   const defaultImage = require('../../assets/img/bowlicon_grey.png')
   const [filePath, setFilePath] = useState(defaultImage);

   const navigate = useNavigate(),
         { id } = useParams(),
         bowlID = id; // bowlID = useParams().id
   let decodedToken,
       userRole; 

   // get user token
   const currentTokens = localStorage.getItem("userTokens")
   if (currentTokens)
   {
      decodedToken = jwt_decode(JSON.parse(currentTokens).token)
      userRole = decodedToken?.roleID ?? '';
   }

   // get data
   useEffect( () => {
      let cleaning = false,
          stockArr = [],
          ingredientsID = [];

      let admittedRoles = ['ROLE_ADMIN'] ;
      setIsAdmitted(admittedRoles.includes(userRole))

      // get data
      getOneMeal(bowlID).then((res)=>{
         if (cleaning) return;

         let fetchStocks = async () => {
            for (const ingredientID of res.data.ingredients) {
               try
               {
                  const currStock = await getOneStock(ingredientID);
                  stockArr.push(currStock?.data?.name ??  '')
               }
               catch(err)
               {
                  // nothing to inform
               }
            }
            setIngredients(stockArr)
            setIngredientsLoaded(true)
         }

         fetchStocks()

         // fetch image
         try
         {
            let fecthedImage = require(`/menu/${bowl?.image}`)
            if (fecthedImage)
            {
               setFilePath(fecthedImage)
            }
         }
         catch(err)
         {
            err.code = '';
            err.message = "L'image du bowl n'a pas pu être récupérée."
            errorHandler('TOAST', err)      
         }

         setBowl(res.data)

      }).catch((err)=>{
         errorHandler('REDIRECT', err, navigate, 'bowl')      
      }).finally(()=>{
         setIsLoaded(true)
      })

      return ()=>{
         cleaning = true
      }

   }, [bowlID, userRole, navigate] )

   const navigateForm = () => {
      navigate(`/menus/edit/${bowlID}`, { replace: true })
   }

   const cancelReservationBtn = (bowlID) => {
      deleteMeal(bowlID).then((res) => {
         navigate('/menus/admin-list', 
         {
            replace: true, 
            state: {
               message: 'Le bowl a été supprimé avec succès'
            } 
         })
      }).catch((err) => {
         errorHandler('TOAST', err)
      })
   }

   return (
      <>
         <div className="bowlCtnr bowlDetailCtnr d-flex flex-column p-4">

            <ThinHeader subTitle='Gérer les bowls' />
            <Row className="bowlDetails text-start justify-content-center">
               {
                  (isLoaded) 
                  ? <>

                     <Col xs={12} className="mb-4">
                        <h3 className="d-inline mauikea_font">Le {bowl?.name}</h3>
                        {
                           (isAdmitted)
                           ? <div className="bowlBtnCtnr d-inline-flex align-items-end ml-4">
                              <i className='fa-solid fa-pen-to-square mr-2' onClick={()=>{navigateForm(bowl?._id)}}></i>
                              <i className='fa-solid fa-square-xmark negativeColor' onClick={()=>{cancelReservationBtn(bowl?._id)}}></i>
                           </div>
                           : ''
                        }
                     </Col>
                     <Col xs={4} className="imgCtnr">
                        <img src={filePath} alt={bowl?.name} className="img-fluid"/>
                     </Col>
                     <Col xs={7}>
                        <div>
                           <h2 className="mauikea_font">{bowl?.price}</h2>
                           <p>{bowl?.description}</p>
                        </div>
                        <Row className="mt-5">
                           <Col xs={6}>
                              <h4>Ingrédients</h4>
                              {
                                 (ingredientsLoaded)
                                 ? (ingredients.length > 0)
                                    ? <ul>{ingredients.map((ingr, index)=><li key={index}>{ingr}</li>)}</ul>
                                    : <p className="infoStyle">Oups... Tous les ingrédients se sont enfuit ! Nous partirons à leur recherche très bientôt. Excusez-nous pour la gène occasionnée.</p>
                                 : <LoadingSpinner />
                              }
                           </Col>
                           <Col xs={6}>
                              <h4>Allergènes</h4>
                              <p className="infoStyle pr-5">Aucun allergène renseigné pour cette recette ! Vous pourrez profiter tranquillement.</p>
                           </Col>
                        </Row>
                     </Col>
                  </>
                  : <LoadingSpinner />
               }
            </Row>   
         </div>
      </>
   )
}
export default BowlDetail;