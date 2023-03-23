import { getAllUsers } from './../../services/users';
import { useEffect, useState } from 'react';

import { Col, Row, Container  } from 'react-bootstrap';
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

    const tableCustomStyles = {
        headRow: {
          style: {
            color:'#223336',
            backgroundColor: '#D8D8D8'
          },
        },
        rows: {
          style: {
            color: "#DAFBE2",
            backgroundColor: "#DAFBE2"
          },
          stripedStyle: {
            color: "#91D5A3",
            backgroundColor: "#91D5A3"
          }
        }
      }

    const columns = [
        {
            name: 'Prénom',
            selector: row => row.firstName,
            sortable: true,
            center: true,
        },
        {
            name: 'Nom',
            selector: row => row.lastName,
            sortable: true,
            center: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
            center: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            center: true,
        },
    ];

    const usersDatas = [];
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
        <Container>
            <Row>
                <Col className='col-12 flex-center'>
                    <img
                        src="bowllywood.png"
                        alt="Logo du restaurant de bowls nommé Bowllywood"
                    />
                </Col>
            </Row>
        <DataTable
            columns={columns}
            data={usersDatas}
            pagination
            striped
            customStyles={tableCustomStyles}
            highlightOnHover
            pointerOnHover
            />
        </Container>
    );
};
export default UserListScreen;
