import { useState } from "react";
import cn from "classnames";
import './Flipcard.scss';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function FlipCard({ card }) {

  const [showBack, setShowBack] = useState(false);

  return (
    <div
      tabIndex={card.id} 
      className={cn("flip-card-outer", { 
        "focus-trigger": card.variant === "focus" 
      })} 
    >
        <div
            className={cn("flip-card-inner", {
            showBack,
            "hover-trigger": card.address !== ""
            })}
        >
            <div className="card front">
                <div className="card-body text-center d-flex flex-column justify-content-center">
                    <h2 className="card-text fs-1 fw-bold h4">{card.city} <span>{card.district}</span></h2>
                        <p className="card-text fs-1 fw-bold">{card.address}</p>
                        <p className="card-text fs-1 fw-bold">{card.zipcode} <span>{card.city}</span></p>
                        <p className="card-text fs-1 fw-bold">{card.phone}</p>
                        <p className="card-text fs-1 fw-bold">{card.email}</p>
                        <p className="card-text fs-1 fw-bold">Commodités : {card.facilities}</p>
                        <p className="card-text fs-1 fw-bold">Accès handicapés : {card.pmrAccess ? 'Oui' : 'Non'}</p>
                </div>
            </div>
            <div className="card back">
                <div className="card-body text-center d-flex flex-column justify-content-center">
                    <p className="card-text fs-1 fw-bold">Lundi de {card.mondayOpeningTime} a {card.mondayClosingTime}</p>
                    <p className="card-text fs-1 fw-bold">Mardi de {card.tuesdayOpeningTime} a {card.tuesdayClosingTime}</p>
                    <p className="card-text fs-1 fw-bold">Mercredi de {card.wednesdayOpeningTime} a {card.wednesdayClosingTime}</p>
                    <p className="card-text fs-1 fw-bold">Jeudi de {card.thursdayOpeningTime} a {card.thursdayClosingTime}</p>
                    <p className="card-text fs-1 fw-bold">Vendredi de {card.fridayOpeningTime} a {card.fridayClosingTime}</p>
                    <p className="card-text fs-1 fw-bold">Samedi de {card.saturdayOpeningTime} a {card.saturdayClosingTime}</p>
                    <p className="card-text fs-1 fw-bold">{card.sundayOpeningTime} le dimanche</p>
                    <Link
                         to={`/restaurants/edit/${card._id}`}
                        className="text-decoration-none text-black text-center"
                        >
                        <Button className='text-light'>Modifier</Button>
                    </Link>
                    <Link
                         to={`/restaurants/delete/${card._id}`}
                        className="text-decoration-none text-black text-center mt-2"
                        >
                        <Button className='text-light bg-danger'>Supprimer</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}

export default FlipCard;