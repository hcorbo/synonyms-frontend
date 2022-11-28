import classNames from "classnames";
import "./button.scss";
import * as React from "react";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import Spinner from "../Spinner/Spinner";

export interface ButtonProps {
    readonly onClick?: MouseEventHandler<HTMLButtonElement>,
    readonly onMouseEnter?: MouseEventHandler<HTMLButtonElement>,
    readonly onMouseLeave?: MouseEventHandler<HTMLButtonElement>,
    readonly children?: ReactNode,
    readonly buttonStyle?: ButtonStyle,
    readonly style?: CSSProperties,
    readonly type?: ButtonType,
    readonly className?: string,
    readonly active?: boolean,
    readonly loading?: boolean,
    readonly disabled?: boolean,
    readonly spinnerColor?: string
}

export enum ButtonStyle {
    Blue = "blue",
    TransparentBlue = "transparent-blue",
    TransparentRed = "transparent-red",
    Transparent = "transparent",
    Red = "red",
}

export enum ButtonType {
    Button = "button",
    Submit = "submit",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
                                                                     onClick,
                                                                     onMouseEnter,
                                                                     onMouseLeave,
                                                                     children,
                                                                     style = {},
                                                                     className,
                                                                     buttonStyle = ButtonStyle.TransparentBlue,
                                                                     type = ButtonType.Button,
                                                                     loading = false,
                                                                     disabled = false,
                                                                     active = false,
                                                                     spinnerColor,
                                                                 }: ButtonProps, ref) => {
    return (
        <button
            className={classNames("custom-button", className, buttonStyle, active && "active", loading && "loading")}
            style={style}
            ref={ref}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            type={type}
            disabled={disabled || loading}>
            {children}
            {loading && <Spinner size={14} color={spinnerColor ?? "#FFF"}/>}
        </button>
    );
});

export default Button;
