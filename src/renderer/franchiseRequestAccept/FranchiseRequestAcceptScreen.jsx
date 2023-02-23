
import { useParams, useNavigate  } from 'react-router-dom';
import { acceptFranchiseRequest } from '../../services/franchiseRequests';
import { useEffect, useState } from 'react';

const FranchiseRequestAcceptScreen = () => {

    const [franchiseRequestAccept, setFranchiseRequestAccept] = useState(null);
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        acceptFranchiseRequest(id)
        .then((res) => {
            setFranchiseRequestAccept(res.data);
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

export default FranchiseRequestAcceptScreen;
