import { TextField } from '@mui/material';
import { Modal, Button } from 'react-bootstrap'

const ConfirmDialogDeclineHoliday = ({
    show,
    onClose,
    onDelete,
    commentValue
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Decline Message</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <TextField onChange={commentValue} placeholder='Decline comment...'></TextField>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Go Back</Button>
                <Button variant="danger" onClick={onDelete}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDialogDeclineHoliday;