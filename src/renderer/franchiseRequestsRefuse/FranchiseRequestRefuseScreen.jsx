
import { useParams, useNavigate  } from 'react-router-dom';
import { refuseFranchiseRequest } from '../../services/franchiseRequests';
import { useEffect, useState } from 'react';

const FranchiseRequestRefuseScreen = () => {

    const [franchiseRequestRefuse, setFranchiseRequestRefuse] = useState(null);
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        refuseFranchiseRequest(id)
        .then((res) => {
            setFranchiseRequestRefuse(res.data);
            console.log(res.data);
            navigate("/franchiseRequestsList");
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

export default FranchiseRequestRefuseScreen;
