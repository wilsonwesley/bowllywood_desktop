import './reservation.scss';
import { useState, useEffect } from 'react';
import { getOneReservation } from '../../services/reservation';

function ReservationDetail () {

	const [ reservation, setReservation ] = useState({});
	const resId = '63d3ae6f01b5cc9f6252d8da';

	// si ID est vide, le back renvoie tous les élément de la collection. 
	// Gérer si est vide. msg d'erreur.
	useEffect(()=>{

		getOneReservation(resId).then((res)=>{
			setReservation(res.data)
		}).catch((err)=>{
			console.log('GET ONE RESERVATION : ', err);
		})

	}, [])

	return (

/*
	container
		thinHeader + subtitle en dure

		row gap ou margin
			col 
				span
				text
				span
			col 
				logo
				logo

		row content
			col padding 4em + border left
				div
					text
					text>span milieu
				div
					text>span
					text>span

		row navBottom
*/


 		<p>ReservationDetail</p>
	)
}

export default ReservationDetail;