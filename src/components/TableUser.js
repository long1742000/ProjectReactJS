import Table from 'react-bootstrap/Table';
import fetchData from './fetchData';
import { useEffect, useState } from 'react';

const TableUser = (props) => {

    const [listData, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        let res = await fetchData();
        if (res && res.data) {
            setData(res.data.data);
        }
    }

    console.log(listData);
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listData && listData.length > 0 &&
                        listData.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                </tr>
                            )
                        })
                    }
                    {
                        !listData && listData.length <= 0 &&
                        <tr>
                            <td colSpan='4'>Loading data...</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TableUser;