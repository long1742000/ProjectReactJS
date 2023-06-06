import Table from 'react-bootstrap/Table';
import { fetchData } from './fetchData';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import AddNewModal from './AddNewModal';
import DeleteModal from './DeleteModal';
import { toast } from 'react-toastify';
import _, { debounce } from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

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

    // Export data
    const [dataExport, setDataExport] = useState([]);

    const typeEmail = (event) => {
        setEmail(event.target.value);
    }

    const typeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const typeLastName = (event) => {
        setLastName(event.target.value);
    }

    const typeKeyword = debounce((event) => {
        let typing = event.target.value;
        if (typing) {
            let cloneListData = [...listData];
            cloneListData = cloneListData.filter(item => item.email.includes(typing));
            setData(cloneListData);
        }
        else {
            getData(1);
        }
    }, 100);

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

    // Export data function
    const getDataExport = (event, done) => {
        let rs = [];
        if (listData && listData.length > 0) {
            rs.push(["Id", "Email", "First name", "Last name"]);
            listData.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;

                rs.push(arr);
            })

            setDataExport(rs);
            done();
        }
    }

    // Import data function
    const importDatafromFile = (event) => {
        let file = event.target.files[0];
        if (file && file.type !== "text/csv") {
            toast.error("Please import file CSV")
        }
        else {
            Papa.parse(file, {
                complete: function (results) {
                    let dataImport = results.data;
                    if (dataImport && dataImport.length > 0) {
                        if (dataImport[0] && dataImport[0].length === 3) {
                            if (dataImport[0][0] !== "email"
                                || dataImport[0][1] !== "first_name"
                                || dataImport[0][2] !== "last_name"
                            ) {
                                toast.error("Wrong format header CSV file !!!");
                            }
                            else {
                                console.log(dataImport);
                                let obj = {};
                                let rs = [];
                                dataImport.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        obj.id = index;
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];

                                        rs.push(obj);
                                    }
                                })

                                setData(rs);
                                toast.success("Success!!!")
                            }
                        }
                        else {
                            toast.error("Wrong format CSV file !!!");
                        }
                    }
                    else {
                        toast.error("Can not found data in CSV file !!!");
                    }
                }
            });
        }


    }

    return (
        <>
            <h3>List user:</h3>
            <div className='action'>
                <input className='form-control m-2 search' onChange={(event) => { typeKeyword(event) }} placeholder='Search by email...'></input>
                <div>


                    <button className='btn btn-primary btn-action m-2' onClick={() => { setShowModalAddNew(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg> Add new
                    </button>

                    <input id="file" type='file' hidden onChange={(event) => { importDatafromFile(event) }} ></input>
                    <label className="btn btn-success btn-action m-2" htmlFor="file">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                            <path d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                        </svg> Import
                    </label>

                    <CSVLink
                        data={dataExport}
                        filename={"download-user.csv"}
                        className="btn btn-warning btn-action m-2"
                        asyncOnClick={true}
                        onClick={getDataExport}
                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg> Export</CSVLink>
                </div>
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
                                                <button className='btn btn-default m-2' onClick={() => { clickEdit(item) }}>
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