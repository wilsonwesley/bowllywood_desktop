import './bowl.scss';
// data
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllBowls } from '../../services/bowl';
import jwt_decode from "jwt-decode";
// front
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ThinHeader from '../../components/ThinHeader';
import ReservationListStat from '../../components/ReservationListStat';
import LoadingSpinner from '../../components/LoadingSpinner';
import Checkbox from '@mui/material/Checkbox';
// utils
import { errorHandler } from '../../utils/errorHandler';
import 'react-toastify/dist/ReactToastify.css';
 
function BowlAdminList () {
   const [bowls, setBowls] = useState([]),
         [selectedCategory, setSelectedCategory] = useState(['SALE', 'SUCRE']),
         [rotate, setRotate] = useState(false),
         [isAdmitted, setIsAdmitted] = useState(false),
         [cleaning, setCleaning] = useState(false),
         [sortIcon, setSortIcon] = useState('up'),
         [refreshData, setRefreshData] = useState(false),
         [sweetNumber, setSweetNumber] = useState(0),
         [saltedNumber, setSaltedNumber] = useState(0),
         [isLoaded, setIsLoaded] = useState(false);

   const location = useLocation();

   useEffect(()=>{
      setCleaning(false);

      if (!cleaning) {
         const message = location?.state?.message;
         if (message ) {
            delete location?.state?.message;
            toast?.dismiss()
            toast.success(message, {
               position: "bottom-center",
               autoClose: true,
               closeOnClick: true,
               pauseOnHover: false,
               progress: true,
               theme: "light"
            })
         }

         // get user role
         const currentTokens = localStorage.getItem("userTokens");
         if (currentTokens) {
            const decodedToken = jwt_decode(JSON.parse(currentTokens).token),
                 userRole = decodedToken?.roleID ?? '',
                 admittedRoles = ['ROLE_ADMIN']
            setIsAdmitted((admittedRoles.includes(userRole)) ? true : false)
         }
      }

      return () => {
         setCleaning(true)
      }
   }, [location])

   useEffect(()=>{
      setCleaning(false);

      getAllBowls().then((res)=>{
         if (cleaning) return;
         res.data.sort((first, second)=> (first.name < second.name) ? 1 : -1)
         
         let sweetLentgh = res.data.filter(bowl => bowl.category === 'SUCRE').length;
         let saltedLentgh = res.data.filter(bowl => bowl.category === 'SALE').length;
         setSaltedNumber(saltedLentgh);
         setSweetNumber(sweetLentgh);
         setBowls(res.data)
      }).catch((err)=>{
         setBowls([])
         setSaltedNumber(0)
         setSweetNumber(0)
         switch (err?.response?.status)
         {
            case 404:
               break
            case 403:
               delete err?.response?.data?.message ;
               delete err?.message ;
               errorHandler('TOAST', err)
               break
            default:
               errorHandler('TOAST', err)
         }
      }).finally(()=>{
         setIsLoaded(true)
      })

      return () => {
         setCleaning(true)
      }
   }, [refreshData])

   useEffect(()=>{
      setCleaning(false);

      if (!cleaning && selectedCategory.length === 0) {
         setSelectedCategory(['SALE', 'SUCRE'])
      }

      return () => {
         setCleaning(true)
      }
   }, [selectedCategory])

   const sortList = () => {
      let newIcon = (sortIcon === 'down') ? 'up' : 'down';
      setSortIcon(newIcon)

      bowls.sort(()=>{
         return -1;
      })
   }

   const formatCategory = (categoryCode) => {
      let category, categoryColor;
      switch (categoryCode) {
         case 'SUCRE':
            category = 'Sucré';
            categoryColor = 'sweetColor';
            break;
         case 'SALE':
            category = 'Salé';
            categoryColor = 'saltedColor';
            break;
         default:
            category = 'Indéfini';
            categoryColor = '';
      }
      return {category, categoryColor};
   }

   const BowlsRender = () => {
      if (bowls.length > 0)
      {
         return (bowls.map((bowl) => {
            let {category, categoryColor} = formatCategory(bowl?.category)

            return (
            <ListGroupItem key={bowl?._id}
               action={true}
               active={true}
               href={`/menus/${bowl?._id}`}
               className={`bowlListItem px-0 ${(!selectedCategory.includes(bowl?.category)) ? 'd-none' : '' }`} >
               <Row className="d-flex justify-content-between m-0 pt-2 w-100">
                  <Col className="p-0">
                     <span className="mediumText">{bowl?.ingredients?.length} ingrédients</span>
                     <p>{bowl?.name}</p>
                  </Col>
                  <Col sm={6} md={7} lg={5} xl={4} className="p-0">
                     <p className="">{bowl?.price}</p>
                     <span className={`priceText ${categoryColor}`}>{category}</span>
                  </Col>
               </Row>
            </ListGroupItem>
            )
         }))
      }
      else
      {
         return(
            <div className="d-flex align-items-center justify-content-center text-center mt-5">
                <span>Aucune bowl n'a été trouvé.</span>
            </div>)
      }
   }

   const CheckboxText = ({text, checked})=>(<span className={`rounded px-3 py-1 m-0 ${(checked) ? 'checked' : ''}`}>{text}</span>)

   const handleChecked = ({target}) => {
      const {value, checked} = target;
      if (checked) {
         setSelectedCategory((selectedCategory)=>[...selectedCategory, value])
      } else {
         setSelectedCategory(selectedCategory.filter((type)=>type !== value))
      }
   }

   return (
   <div className="bowlCtnr d-flex flex-column px-5 py-4">

      <ThinHeader subTitle="Gérer les bowls" />

      <Row className="bowlStatistic justify-content-center">
         <ReservationListStat number={saltedNumber} title="salés" />
         <ReservationListStat number={bowls.length} title="bowls en tout" />
         <ReservationListStat number={sweetNumber} title="sucrés" />
      </Row>

      <Row className="bowlListContent justify-content-center">
         <Col xs={12} lg={11} xl={10} >
            <div className="d-flex align-items-center mb-3">
               <p className="d-inline">Liste des bowls</p>
               <span className="ml-3"> – </span> 
               
               <Checkbox
                  id='sale-checked'
                  inputProps={{ 'aria-label': 'controlled' }}
                  icon={<CheckboxText text='salé' />}
                  checkedIcon={<CheckboxText text='salé' checked={true} />}
                  value='SALE'
                  checked={(selectedCategory.includes('SALE')) ? true : false}
                  onChange={handleChecked}
                  className="mediumText"
                  />

               <Checkbox
                  id='sucre-checked'
                  inputProps={{ 'aria-label': 'controlled' }}
                  icon={<CheckboxText text='sucré' />}
                  checkedIcon={<CheckboxText text='sucré' checked={true} />}
                  value='SUCRE'
                  checked={(selectedCategory.includes('SUCRE')) ? true : false}
                  onChange={handleChecked}
                  className="mediumText"
                  />

            </div>
            <Row className="flex-column-reverse flex-md-row justify-content-between px-4" >
               <Col md={8} xxl={7} className="bowlList">
                  <div className="d-flex justify-content-end mb-3">
                     <i className={`fa-solid fa-rotate-right mr-3 ${(rotate) ? 'rotate' : ''}`} 
                        onClick={() => {setRefreshData(!refreshData); setRotate(true) }}
                        onAnimationEnd={() => setRotate(false)}
                     ></i>
                     <i className={`fa-solid fa-arrow-${sortIcon}`} onClick={sortList}></i>
                  </div>

                  <ListGroup className="pl-4">
                  {
                     (isLoaded)
                     ? <BowlsRender />
                     : <div className="d-flex align-items-center justify-content-center">
                        <LoadingSpinner />
                        <span className="ml-3">Chargement des bowls</span>
                       </div>
                  }
                  </ListGroup>
               </Col>
               <Col md={3} xxl={3}>
                  {
                     (isAdmitted)
                     ? <Link to='/menus/create' className='d-flex flex-column justify-content-center align-items-center text-decoration-none'>
                           <i className="addIcon fa-solid fa-plus mb-3"></i>
                           <p className="addText text-center">Créer un bowl</p>
                        </Link>
                     : ''
                  }
               </Col>
            </Row>
         </Col>
      </Row>
   </div>
   )
}

export default BowlAdminList;