import './reservation.scss';
import { useState, useEffect } from 'react';
import { getAllReservations } from '../../services/reservation'

function ReservationList () {

	const [reservations, setReservations] = useState([]);

	useEffect(()=>{

		getAllReservations().then((res)=>{
			setReservations(res.data)
		}).catch((err)=>{
			console.log('GET ALL RESERV : ', err)
		})
	
	}, [])

	return (

/*
	container
		thinHeader + subtitle en dure

		row center gap ou margin
			col 
				span number
				text
				span
			idem 
			idem sans subtitle & color

		row content
			col liste
				p>span className-petit
				div btns, flex between
					div 2 btns
						logo grille
						logo liste
					logo tri
				listGroup
					listGroupItem
						div flex between
							div droite
								text seats
								text noms
							div gauche
								text>span milieu class-petit
								text couleur
			col bouton
				div flex
					logo
					text
		
		row navBottom	
*/


		<div>
		{
			reservations.map((reserv, index)=>{
				return (<p key={index}>{reserv.reservName}</p>)
			})
		}
		</div>
	)
}

export default ReservationList;