
import { useParams, useNavigate  } from 'react-router-dom';
import { deleteStock } from '../../services/stocks';
import { useEffect, useState } from 'react';

const StockDeleteScreen = () => {

    const [stockDeletion, setStockDeletion] = useState(null);
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        deleteStock(id)
        .then((res) => {
            setStockDeletion(res.data);
            console.log(res.data);
            navigate("/stocks");
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

export default StockDeleteScreen;
