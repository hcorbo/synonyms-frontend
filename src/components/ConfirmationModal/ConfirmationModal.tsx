import React from 'react';
import "./confirmation_modal.scss";
import Modal from "../Modal/Modal";
import Button, { ButtonStyle } from "../Button/Button";

export interface ConfirmationModalProps {
    open: boolean
    setOpen: (open: boolean) => void,
    title: string,
    text: string,
    onConfirm: () => void,
}

function ConfirmationModal({ open, setOpen, title, onConfirm, text }: ConfirmationModalProps) {
    return (
        <Modal open={open} setOpen={setOpen} childClassName={"confirmation-modal"}>
            <div className="alert-header">
                <div className="title">{title}</div>
            </div>
            <div className="alert-body">
                {text}
            </div>
            <div className="alert-footer">
                <Button buttonStyle={ButtonStyle.Transparent}
                        onClick={() => setOpen(false)}>
                            <span className="text-medium text-14 text-uppercase">
                                Cancel
                            </span>
                </Button>
                <Button buttonStyle={ButtonStyle.Red}
                        onClick={onConfirm}>
                    <span className="text-medium text-14 text-uppercase">
                        Delete
                    </span>
                </Button>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;
