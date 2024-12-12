import { Camera } from '@nativescript/camera';
import { ImagePicker } from '@nativescript/imagepicker';

export class PermissionsUtil {
    static async requestCameraPermission(): Promise<boolean> {
        return Camera.requestPermissions();
    }

    static async requestGalleryPermission(): Promise<boolean> {
        const imagePicker = new ImagePicker();
        return imagePicker.authorize();
    }
}