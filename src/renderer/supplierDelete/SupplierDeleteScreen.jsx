
import { useParams, useNavigate  } from 'react-router-dom';
import { deleteSupplier } from '../../services/suppliers';
import { useEffect, useState } from 'react';

const SupplierDeleteScreen = () => {

    const [supplierDeletion, setSupplierDeletion] = useState(null);
    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        deleteSupplier(id)
        .then((res) => {
            setSupplierDeletion(res.data);
            console.log(res.data);
            navigate("/supplierList");
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

export default SupplierDeleteScreen;
