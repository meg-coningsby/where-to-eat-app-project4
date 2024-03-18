import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent>{children}</DialogContent>
            <Button onClick={onClose}>Close</Button>
        </Dialog>
    );
}
