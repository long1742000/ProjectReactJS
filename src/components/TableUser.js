import Table from 'react-bootstrap/Table';
import { fetchData } from './fetchData';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import AddNewModal from './AddNewModal';

const TableUser = (props) => {

    const [listData, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        getData(1);
    }, [])

    const getData = async (page) => {
        let res = await fetchData(page);
        if (res && res.data) {
            setTotalData(res.total);
            setTotalPage(res.total_pages)
            setData(res.data);
        }
    }

    const [showModalAddNeww, setShowModalAddNew] = useState(false);

    const handleClose = () => {
        setShowModalAddNew(false);
    }

    console.log(listData);

    const handlePageClick = (event) => {
        getData(event.selected + 1);
    }

    const addNewData = (data) => {
        setData([data, ...listData]);
    }

    const deleteData = (id) => {
        let newListData = listData.filter(item => item.id !== id);
        setData(newListData);
    }

    return (
        <>
            <h3>List user:</h3>
            <div className='action'>
                <input className='form-control m-2 search' placeholder='Search...'></input>
                <button className='btn btn-primary m-2'>Search</button>
                <button className='btn btn-primary btn-action m-2' onClick={() => { setShowModalAddNew(true) }}>Add new</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th></th>
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
                                    <td>
                                        <button className='btn btn-success m-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg>
                                        </button>
                                        <button className='btn btn-danger m-2' onClick={() => { deleteData(item.id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                    </td>
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
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

            <AddNewModal
                show={showModalAddNeww}
                handleClose={handleClose}
                addNewData={addNewData}
            />

        </>
    )
}

export default TableUser;