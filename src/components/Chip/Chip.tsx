import React, {ReactNode} from 'react';
import "./chip.scss"
import classNames from "classnames";

export interface ChipProps {
    children: ReactNode,
    className?: string
}

function Chip({children, className}: ChipProps) {

    return (
        <div className={classNames('custom-chip', className)}>
            {children}
        </div>
    )
}

export default Chip;
