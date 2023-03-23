import { getAllUsers } from './../../services/users';
import { useEffect, useState } from 'react';

import { Col, Row, Container, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const UserListScreen = () => {

    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        getAllUsers()
            .then((res) => {
                setAllUsers(res.data.data);
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const columns = [
        {
            name: 'Prénom',
            selector: row => row.firstName,
        },
        {
            name: 'Nom',
            selector: row => row.lastName,
        },
        {
            name: 'Role',
            selector: row => row.role,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
    ];
    
let usersDatas = [];
let singleUserDatas = {};
    {allUsers.map((item) => (
            singleUserDatas = 
            {
                firstName: item.firstName,
                lastName: item.lastName,
                role: item.userRole,
                email: item.email,
            },
        usersDatas.push(singleUserDatas)   
    ))} 

    return (
        <DataTable
            columns={columns}
            data={usersDatas}
        />
    );

    // return (
    //     <Container>
    //         <Row>
    //             <Col className='col-12 flex-center'>
    //                 <img
    //                     src="bowllywood.png"
    //                     alt="Logo du restaurant de bowls nommé Bowllywood"
    //                 />
    //             </Col>
    //         </Row>
    //         {/* <Row>
    //             <Col className='text-center mb-4'>
    //                 <Link
    //                     to={`/restaurants/add`}
    //                     className="text-decoration-none text-black text-center"
    //                     >
    //                     <Button className='text-dark'> Ajouter un restaurant</Button>
    //                 </Link>
    //             </Col>
    //         </Row> */}
    //         <Row>
    //             {/* {allUsers.map((card) => (
    //                 <Col xs={12} sm={6} md={4}>lala
    //                 <FlipCard key={card.id} card={card} />
    //                 </Col>
    //             ))} */}
               

    //            <Col>
    //                 <Table striped bordered hover>
    //                     <thead>
    //                         <tr className='text-center'>
    //                             <th>Prénom</th>
    //                             <th>Nom</th>
    //                             <th>Role</th>
    //                             <th>Adresse email</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {allUsers.map(
    //                             (item) => {
    //                                 return (
    //                                     <tr className='text-center'
    //                                         key={item._id}>
    //                                             <td>
    //                                             {item.firstName}
    //                                         </td>
    //                                         <td>
    //                                             {item.lastName}
    //                                         </td>
    //                                         <td>
    //                                             {item.userRole}
    //                                         </td>
    //                                         <td>
    //                                             {item.email}
    //                                         </td>
    //                                         <td>   
    //                                              <Link
    //                                                     to={`/franchise-requests/${item._id}`}
    //                                                     className="text-decoration-none text-black text-center"
    //                                                 >
    //                                             <Button className='text-dark'>Consulter</Button>
    //                                             </Link>
    //                                         </td>
    //                                     </tr>
    //                                 );
    //                             }
    //                         )}
    //                     </tbody>
    //                 </Table>
    //             </Col>
    //         </Row>
    //     </Container>
    // );
};
export default UserListScreen;
