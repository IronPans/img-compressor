export class Create {
    constructor(options = {}) {
        const defaults = {
            mimeType: 'image/png',
            quality: 1
        };
        this.canvas = null;
        this.options = Object.assign(defaults, options);
    }

    compress(file, options = {}) {
        if (!file) {
            return;
        }
        const params = Object.assign(this.options, options);
        let image;

        this.compressImage(file, params)
            .then((img) => {
                image = img;
                return this.toBlob(img, params);
            })
            .then((blob) => {
                if (window.URL) {
                    window.URL.revokeObjectURL(image.src);
                }
                blob.name = file.name;
                if (params.success) {
                    params.success.call(this, blob);
                }
            })
            .catch((err) => {
                if (!params.error) {
                    throw err;
                }
                params.error.call(this, err);
            });
    }

    compressImage(file) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve(image);
            if (window.URL) {
                image.src = window.URL.createObjectURL(file);
            } else {
                const reader = new FileReader();

                reader.onload = (e) => {
                    image.src = e.target.result;
                };

                reader.onabort = () => {
                    reject(new Error('Aborted to load the image with FileReader.'));
                };
                reader.onerror = () => {
                    reject(new Error('Failed to load the image with FileReader.'));
                };

                reader.readAsDataURL(file);
            }
        });
    }

    toBlob(image, options) {
        const rect = this.getRect(image, options);
        return new Promise((resolve, reject) => {
            if (!this.canvas) {
                this.canvas = document.createElement('canvas');
            }
            if (!this.canvas.getContext) {
                reject('Unsupport Canvas!');
            } else {
                const ctx = this.canvas.getContext('2d');
                this.canvas.width = rect.width;
                this.canvas.height = rect.height;
                ctx.drawImage(image, 0, 0, rect.width, rect.height);
                const done = (blob) => {
                    if (blob) {
                        resolve(blob);
                    }
                };

                this.canvas.toBlob(done, options.mimeType, options.quality);
            }
        });
    }

    getRect(image, options) {
        const naturalWidth = image.naturalWidth;
        const naturalHeight = image.naturalHeight;
        const aspectRatio = naturalWidth / naturalHeight;
        let width = naturalWidth;
        let height = naturalHeight;

        if (options.width > 0) {
            width = options.width;
            height = options.width / aspectRatio;
        } else if (options.height > 0) {
            height = options.height;
            width = height * aspectRatio;
        }
        return {
            width,
            height
        };
    }
}
