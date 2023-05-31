import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const DeleteModal = (props) => {
    const { data, show, handleModalDeleteClose, deleteData } = props;

    let value = '';
    if (data) value = data.email;

    const yes = (id) => {
        deleteData(id);
        handleModalDeleteClose();
        toast.success("Success...")
    }

    return (

        <Modal show={show}
            onHide={handleModalDeleteClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Want to delete this user ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You really want to delete user have email is "<strong>{value}</strong >" ?</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalDeleteClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => { yes(data.id) }}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal;