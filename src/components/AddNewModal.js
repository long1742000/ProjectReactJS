import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postNewUser } from './fetchData';
import { toast } from 'react-toastify';

const AddNewModal = (props) => {

    const { show, handleClose, addNewData } = props;
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const typeEmail = (event) => {
        setEmail(event.target.value);
    }

    const typeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const typeLastName = (event) => {
        setLastName(event.target.value);
    }

    const clearInput = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
    }

    const saveUser = async () => {
        if (email.length == 0 || firstName.length == 0 || lastName.length == 0) {
            toast.info("Please type all information")
        }
        else {
            let res = await postNewUser(email, firstName, lastName);
            if (res && res.id) {
                handleClose();
                addNewData({ id: res.id, email: email, first_name: firstName, last_name: lastName });
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
        <Modal show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Email</span>
                    </div>
                    <input type="email" className="form-control" aria-label="email" aria-describedby="basic-addon1" onChange={(event) => { typeEmail(event) }} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">First name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="firstName" aria-describedby="basic-addon1" onChange={(event) => { typeFirstName(event) }} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Last name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="lastName" aria-describedby="basic-addon1" onChange={(event) => { typeLastName(event) }} />
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