import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postNewUser } from './fetchData';
import { toast } from 'react-toastify';

const AddNewModal = (props) => {

    const { show, handleClose, addNewData } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const typeName = (event) => {
        setName(event.target.value);
    }

    const typeJob = (event) => {
        setJob(event.target.value);
    }

    const clearInput = () => {
        setName("");
        setJob("");
    }

    const saveUser = async () => {
        if (name.length == 0 || job.length == 0) {
            toast.info("Please type all information")
        }
        else {
            let res = await postNewUser(name, job);
            if (res && res.id) {
                handleClose();
                addNewData({ first_name: name, id: res.id });
                clearInput();
                toast.success("Success...")
            }
            else {
                toast.error("Something went wrong...")
                clearInput();
            }
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="name" aria-describedby="basic-addon1" onChange={(event) => { typeName(event) }} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Job</span>
                    </div>
                    <input type="text" className="form-control" aria-label="job" aria-describedby="basic-addon1" onChange={(event) => { typeJob(event) }} />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveUser}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddNewModal;