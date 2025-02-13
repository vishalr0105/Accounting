import { EventEmitter, Injectable, Output } from '@angular/core';
import { Image } from '../models/Image'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  image: Image = new Image();
  file: any;
  Url: string;

  ImageEvent: EventEmitter<Image> = new EventEmitter<Image>();

  constructor() { }

  handleInputChange(files) {
    this.file = files;
    let reader = new FileReader();
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (this.file[0] && !validImageTypes.includes(this.file[0].type)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    if (this.file[0] instanceof Blob) {
      reader.readAsDataURL(this.file[0]);
    }
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    let base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    if (!this.image.imgValidation) {
      this.image.name = this.file[0].name;
      this.image.imagebase64 = `data:${this.file[0].type};base64,${base64result}`;

      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(this.file[0].type)) {
        this.image.preview = `data:${this.file[0].type};base64,${base64result}`;
      }
      else {
        this.image.preview = '';
      }
      let img = `${this.file[0].type}`.toUpperCase();
      if (img.includes('/')) {
        this.image.fileType = img.split("/")[1];
      } else {
        this.image.fileType = img;
      }
    }
    this.ImageEvent.emit(this.image);
  }

  onSelect(event: any) {
    let file = event;
    if (file === undefined || file === null) {
      this.image.imageSelected = false;
      return;
    } else {
      this.image.imageSelected = true;
    }
    if (file.size > 2995851) {
      this.image.imgValidation = true;
      this.image.imageSelected = false;
    } else {
      this.image.imgValidation = false;
      this.image.imageSelected = true;
    }

    this.handleInputChange(file);
  }

  base64toBlobAndView(b64: string) {
    let base64 = b64.split(",")[1];
    const type = b64.split(';')[0].split(':')[1];
    // const byteCharacters = atob(base64);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    // const blob = new Blob([byteArray], { type: type });

    let binStr = atob(base64);
    let len = binStr.length;
    let arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }

    let blob = new Blob([arr], { type: type })
    let url = URL.createObjectURL(blob);
    let pdfWindow = window.open("");
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (validImageTypes.includes(type)) {
      pdfWindow.document.write("<head><title>Document</title></head><img height='100%' src='" + url + "'/>");
    } else {
      pdfWindow.document.write("<head><title>Document</title></head><iframe width='100%' height='100%' src='" + url + "'></iframe>");
    }
    setTimeout(() => {
      URL.revokeObjectURL(url);
    },1000)
  }


}
