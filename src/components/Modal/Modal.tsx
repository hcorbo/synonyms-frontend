import React, { CSSProperties, PropsWithChildren, useCallback, useEffect, useState } from "react";
import "./modal.scss";
import classNames from "classnames";

export interface ModalProps {
    className?: string,
    open: boolean,
    dismissible?: boolean,
    style?: CSSProperties,
    childStyle?: CSSProperties,
    childClassName?: string,
    setOpen: (open: boolean) => void,
    closeOnEsc?: boolean,
}

const Modal = ({
                   className,
                   dismissible = true,
                   style,
                   childStyle,
                   childClassName,
                   open,
                   setOpen,
                   children,
                   closeOnEsc = true,
               }: PropsWithChildren<ModalProps>) => {
    const [shown, setShown] = useState(open);

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setShown(open);
            }, 220);
        } else {
            setShown(true);
        }
    }, [open]);

    const onBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (dismissible) {
            setOpen(false);
            setTimeout(() => {
                setShown(false);
            }, 220);
        }
    }, [dismissible, setOpen]);

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            if (e.code === "Escape" && closeOnEsc && dismissible) {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [closeOnEsc, dismissible, setOpen]);

    const onModalBodyClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    if (!shown) {
        return null;
    }

    return (
        <div onClick={onBackdropClick}
             style={style}
             className={classNames("custom-modal", className, { open: open })}>
            <div onClick={onModalBodyClick}
                 style={childStyle}
                 className={classNames(childClassName, { open: open })}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
