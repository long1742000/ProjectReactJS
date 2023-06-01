import Table from 'react-bootstrap/Table';
import { fetchData } from './fetchData';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import AddNewModal from './AddNewModal';
import DeleteModal from './DeleteModal';
import { toast } from 'react-toastify';
import _ from "lodash";

const TableUser = (props) => {

    const [listData, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [selectedData, setSelectedData] = useState({})
    const [editKey, setEditKey] = useState(false);
    const [action, setAction] = useState(0);

    // Edit value
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    // Sort
    const [sortBy, setSortBy] = useState("id");
    const [sortKey, setSortKey] = useState("asc");

    const typeEmail = (event) => {
        setEmail(event.target.value);
    }

    const typeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const typeLastName = (event) => {
        setLastName(event.target.value);
    }

    const typeKeyword = (event) => {
        let typing = event.target.value;
        if (typing) {
            let cloneListData = [...listData];
            cloneListData = cloneListData.filter(item => item.email.includes(typing));
            setData(cloneListData);
        }
        else {
            getData(1);
        }
    }

    // componentDidMount
    useEffect(() => {
        getData(1);
    }, [])

    // Handle modal
    const [showModalAddNeww, setShowModalAddNew] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleClose = () => {
        setShowModalAddNew(false);
    }

    const handleModalDeleteClose = () => {
        setShowModalDelete(false);
        setSelectedData();
    }

    console.log(listData);

    const handlePageClick = (event) => {
        getData(event.selected + 1);
    }

    // CRUD
    const getData = async (page) => {
        let res = await fetchData(page);
        if (res && res.data) {
            setTotalData(res.total);
            setTotalPage(res.total_pages)
            setData(res.data);
        }
    }

    const addNewData = (data) => {
        setData([data, ...listData]);
    }

    const deleteData = (id) => {
        let newListData = listData.filter(item => item.id !== id);
        setData(newListData);
    }

    const editData = (data) => {
        setSelectedData();
        setEditKey(false)

        if (data.email == email && data.first_name == firstName && data.last_name == lastName) {
            toast.info("These is nothing changed !!!")
        }
        else {
            data.email = email;
            data.first_name = firstName;
            data.last_name = lastName;
            toast.success("Success...")
        }
    }

    // Click !!!
    const clickDelete = (data) => {
        setAction(0);
        setShowModalDelete(true);
        setSelectedData(data);
    }

    const clickEdit = (data) => {
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);

        setAction(2);
        setSelectedData(data);
        setEditKey(true);
    }

    const clickCancel = () => {
        setSelectedData();
    }

    const clickSort = (key, by) => {
        setSortKey(key);
        setSortBy(by);

        let cloneListData = [...listData];
        cloneListData = _.orderBy(cloneListData, [by], [key]);
        setData(cloneListData);
    }

    return (
        <>
            <h3>List user:</h3>
            <div className='action'>
                <input className='form-control m-2 search' onChange={(event) => { typeKeyword(event) }} placeholder='Search...'></input>
                <button className='btn btn-primary btn-action m-2' onClick={() => { setShowModalAddNew(true) }}>Add new</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id
                            <svg onClick={() => { clickSort("desc", "id") }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-arrow-down sort" viewBox="0 0 16 16">
                                <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                            </svg>
                            <svg onClick={() => { clickSort("asc", "id") }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-arrow-up sort" viewBox="0 0 16 16">
                                <path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                            </svg>
                        </th>
                        <th>Email</th>
                        <th>First Name
                            <svg onClick={() => { clickSort("desc", "first_name") }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-arrow-down sort" viewBox="0 0 16 16">
                                <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                            </svg>
                            <svg onClick={() => { clickSort("asc", "first_name") }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-arrow-up sort" viewBox="0 0 16 16">
                                <path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                            </svg>
                        </th>
                        <th>Last Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listData && listData.length > 0 &&
                        listData.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {selectedData !== item &&
                                            item.email
                                        }
                                        {editKey && selectedData == item && action == 2 &&
                                            <input className='form-control' defaultValue={item.email} onChange={(event) => { typeEmail(event) }}></input>
                                        }
                                    </td>
                                    <td>
                                        {selectedData !== item &&
                                            item.first_name
                                        }
                                        {editKey && selectedData == item && action == 2 &&
                                            <input className='form-control' defaultValue={item.first_name} onChange={(event) => { typeFirstName(event) }}></input>
                                        }
                                    </td>
                                    <td>
                                        {selectedData !== item &&
                                            item.last_name
                                        }
                                        {editKey && selectedData == item && action == 2 &&
                                            <input className='form-control' defaultValue={item.last_name} onChange={(event) => { typeLastName(event) }}></input>
                                        }
                                    </td>
                                    <td>
                                        {selectedData !== item &&
                                            <>
                                                <button className='btn btn-success m-2' onClick={() => { clickEdit(item) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                    </svg>
                                                </button>
                                                <button className='btn btn-danger m-2' onClick={() => { clickDelete(item) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                    </svg>
                                                </button>
                                            </>
                                        }
                                        {editKey && selectedData == item && action == 2 &&
                                            <>
                                                <button className='btn btn-success m-2' onClick={() => { editData(item) }}>
                                                    Update
                                                </button>
                                                <button className='btn btn-danger m-2' onClick={() => { clickCancel() }}>
                                                    Cancel
                                                </button>
                                            </>
                                        }

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
            </Table >
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

            <DeleteModal
                data={selectedData}
                show={showModalDelete}
                handleModalDeleteClose={handleModalDeleteClose}
                deleteData={deleteData}
            />
        </>
    )
}

export default TableUser;