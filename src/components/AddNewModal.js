import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddNewModal = (props) => {

    const { show, handleClose } = props;
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

    const saveUser = () => {
        if (email.length == 0 || firstName.length == 0 || lastName.length == 0) {
            console.log(`Please type all information`);
        }
        else {
            console.log(`Save email: ${email}, first name: ${firstName}, last name: ${lastName}`);
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
                        <span className="input-group-text" id="basic-addon1">Email</span>
                    </div>
                    <input type="text" className="form-control" aria-label="email" aria-describedby="basic-addon1" onChange={(event) => { typeEmail(event) }} />
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
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddNewModal;