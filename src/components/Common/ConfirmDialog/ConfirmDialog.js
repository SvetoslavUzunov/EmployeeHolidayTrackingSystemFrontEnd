import { Modal, Button } from 'react-bootstrap'

const ConfirmDialog = ({
    show,
    onClose,
    onDelete
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>No</Button>
                <Button variant="danger" onClick={onDelete}>Yes, delete it!</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDialog;