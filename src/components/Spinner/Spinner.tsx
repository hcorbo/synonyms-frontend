import "./spinner.scss";
import ClipLoader from "react-spinners/ClipLoader";
import classNames from "classnames";

export interface SpinnerProps {
    readonly color?: string,
    readonly small?: boolean,
    readonly size?: number,
    readonly containerClass?: string,
}

const Spinner = ({ color, size, small = false, containerClass }: SpinnerProps) => {
    return (
        <div className={classNames("spinner-container", containerClass)}>
            <ClipLoader color={color ?? "#0079d9"}
                        loading={true}
                        size={size ?? (small ? 20 : 60)}/>
        </div>
    );
};

export default Spinner;
