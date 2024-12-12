import { ImagePicker } from '@nativescript/imagepicker';
import { Camera, CameraOptions } from '@nativescript/camera';
import { Photo } from '../models/photo.model';

export class PhotoService {
    private static instance: PhotoService;

    private constructor() {}

    static getInstance(): PhotoService {
        if (!PhotoService.instance) {
            PhotoService.instance = new PhotoService();
        }
        return PhotoService.instance;
    }

    async selectPhotosFromGallery(): Promise<Photo[]> {
        const imagePicker = new ImagePicker();
        const selection = await imagePicker.authorize();
        
        if (!selection) {
            return [];
        }

        const imageAssets = await imagePicker.present();
        if (!imageAssets) {
            return [];
        }

        return imageAssets.map(asset => ({
            path: asset.android || asset.ios,
            timestamp: Date.now()
        }));
    }

    async takePhoto(): Promise<Photo | null> {
        const cameraOptions: CameraOptions = {
            width: 1280,
            height: 1280,
            keepAspectRatio: true,
            saveToGallery: true
        };

        if (!(await Camera.requestPermissions())) {
            return null;
        }

        const imageAsset = await Camera.takePicture(cameraOptions);
        if (!imageAsset) {
            return null;
        }

        return {
            path: imageAsset.android || imageAsset.ios,
            width: imageAsset.width,
            height: imageAsset.height,
            timestamp: Date.now()
        };
    }
}