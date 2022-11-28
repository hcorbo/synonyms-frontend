import Swal, {SweetAlertIcon, SweetAlertOptions} from "sweetalert2";

export class SwalUtils {
    public static showSwalToast(title: string, message: string, icon: SweetAlertIcon, options?: SweetAlertOptions): void {
        Swal.fire({
            ...{
                toast: true,
                position: "top-end",
                timer: 4000,
                title,
                text: message,
                showConfirmButton: false,
                icon,
            }, ...options
        });
    }

    public static showWarningSwalToast(message: string, options?: SweetAlertOptions): void {
        SwalUtils.showSwalToast("Warning", message, "warning", options);
    }

    public static showErrorSwalToast(message: string, options?: SweetAlertOptions): void {
        SwalUtils.showSwalToast("Error", message, "error", options);
    }

    public static showSuccessSwalToast(message: string, options?: SweetAlertOptions): void {
        SwalUtils.showSwalToast("Successfully done", message, "success", options);
    }
}
