import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import avt from '../assets/images/avt.jpg'
import information from '../store/Information';

const DetailModal = (props) => {

    const { show, handleClose } = props;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div className='row'>
                        <div className='col-6'>
                            <img src={avt} className='avatar'></img>
                        </div>
                        <div className='col-6'>
                            Name: <input className='form-control mb-1' readOnly value={`${information.first_name} ${information.middle_name} ${information.last_name}`}></input>
                            Birth: <input className='form-control mb-1' readOnly value={`${information.birth}`}></input>
                            Gender: <input className='form-control mb-1' readOnly value={`${information.gender}`}></input>
                            Address: <input className='form-control mb-1' readOnly value={`${information.address}`}></input>
                            Status: <input className='form-control' readOnly value={`${information.status}`}></input>
                        </div>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailModal;