
import { useParams, useNavigate  } from 'react-router-dom';
import { archiveRestaurant } from '../../services/restaurants';
import { useEffect, useState } from 'react';

const RestaurantArchiveScreen = () => {

    const [restaurantArchive, setRestaurantArchive] = useState(null);
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        archiveRestaurant(id)
        .then((res) => {
            setRestaurantArchive(res.data);
            console.log(res.data);
            navigate("/restaurants");
            })
            .catch((err) => {
                console.log(err);
            })

    }, [id]);


    return (
        <>
        </>
    );

};

export default RestaurantArchiveScreen;
