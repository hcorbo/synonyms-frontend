import * as React from "react";
import "./input_field.scss"
import classNames from "classnames";
import {
    ClipboardEventHandler,
    CSSProperties,
    useCallback,
    useState,
} from "react";

export interface InputProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    name?: string,
    value?: string | ReadonlyArray<string> | number | undefined;
    onPaste?: ClipboardEventHandler<HTMLInputElement>,
    onPasteCapture?: ClipboardEventHandler<HTMLInputElement>,
    style?: CSSProperties;
    error?: string,
    min?: number,
    max?: number,
    showErrorText?: boolean,
    readonly?: boolean,
    onBlur?: () => void,
    onClick?: () => void,
    valueFallback?: string,
    required?: boolean,
    maxLength?: number,
    showLoadingSpinner?: boolean,
    autoComplete?: string,
    className?: string
}


const InputField = React.forwardRef<HTMLInputElement, InputProps>(({
                                                                                      onChange,
                                                                                      label,
                                                                                      name,
                                                                                      placeholder,
                                                                                      value = "",
                                                                                      min,
                                                                                      max,
                                                                                      style = {},
                                                                                      error,
                                                                                      showErrorText = true,
                                                                                      readonly = false,
                                                                                      className,
                                                                                      onBlur,
                                                                                      onClick,
                                                                                      valueFallback,
                                                                                      required = false,
                                                                                      maxLength,
                                                                                      showLoadingSpinner = false,
                                                                                      autoComplete,
                                                                                      onPaste,
                                                                                      onPasteCapture,
                                                                                  }, ref) => {
    const [focused, setIsFocused] = useState(false);
    const toggleFocus = useCallback(() => setIsFocused(!focused), [focused]);

    const renderLabel = () => {
        return <label className={classNames("input-label")}>
            {label}
            {required && <span className="required-character">*</span>}
        </label>;
    };

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (maxLength && val.length > maxLength) {
            e.preventDefault();
            return;
        }

        if (onChange) {
            onChange(e);
        }
    }, [onChange, maxLength]);

    return (
        <div className={classNames("input-field", className, {
            readonly,
            focused,
            error,
            filled: Boolean(value),
        })}
             style={style}>
            <div className="input-container">
                {label && (
                    renderLabel()
                )}

                <div className="inner">
                    <input
                        readOnly={readonly}
                        onInput={onChange ? onInputChange : undefined}
                        min={min}
                        max={max}
                        onPaste={onPaste}
                        onPasteCapture={onPasteCapture}
                        autoComplete={autoComplete}
                        maxLength={maxLength}
                        onClick={onClick}
                        ref={ref}
                        onFocus={toggleFocus}
                        onBlur={() => {
                            toggleFocus();

                            if (onBlur) {
                                onBlur();
                            }
                        }}
                        name={name}
                        placeholder={placeholder}
                        value={(readonly && !value) ? valueFallback && valueFallback : value}
                        type={"text"}
                    />
                </div>
            </div>
            {showErrorText && (
                <div className="input-error">{error}</div>
            )}
        </div>
    );
});

export default InputField;
