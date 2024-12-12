import { BaseViewModel } from '../../shared/view-models/base.view-model';
import { PhotoService } from '../../shared/services/photo.service';
import { Photo } from '../../shared/models/photo.model';

export class HomeViewModel extends BaseViewModel {
    private _selectedPhotos: Photo[] = [];
    private photoService: PhotoService;
    
    constructor() {
        super();
        this.photoService = PhotoService.getInstance();
        this.set('hasPhotos', false);
    }

    get selectedPhotos(): Photo[] {
        return this._selectedPhotos;
    }

    get hasPhotos(): boolean {
        return this._selectedPhotos.length > 0;
    }

    async onSelectPhotos() {
        try {
            this.isLoading = true;
            const photos = await this.photoService.selectPhotosFromGallery();
            this._selectedPhotos.push(...photos);
            this.notifyPropertyChange('selectedPhotos', this._selectedPhotos);
            this.notifyPropertyChange('hasPhotos', this.hasPhotos);
        } catch (error) {
            console.error('Error selecting photos:', error);
        } finally {
            this.isLoading = false;
        }
    }

    async onTakePhoto() {
        try {
            this.isLoading = true;
            const photo = await this.photoService.takePhoto();
            if (photo) {
                this._selectedPhotos.push(photo);
                this.notifyPropertyChange('selectedPhotos', this._selectedPhotos);
                this.notifyPropertyChange('hasPhotos', this.hasPhotos);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
        } finally {
            this.isLoading = false;
        }
    }

    onCreateCollage() {
        // To be implemented in the next phase
        console.log('Creating collage with', this._selectedPhotos.length, 'photos');
    }
}