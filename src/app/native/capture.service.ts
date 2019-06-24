import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CaptureService {

  /**
    * @name _READER
    * @type object
    * @private
    * @description              Creates a FileReader API object
    */
  private _READER: any = new FileReader();




  /**
   * @name _IMAGE
   * @type object
   * @private
   * @description              Create an image object using the Angular SafeResourceUrl
   * 							Interface property to define a URL as safe for loading
   *							executable code from
   */
  private _IMAGE: SafeResourceUrl;




  constructor(public http: HttpClient,
    private sanitizer: DomSanitizer) { }




  /* ----------------------------------------------------------------

     Mobile environment specific methods - used for iOS/Android only

     ---------------------------------------------------------------- */




  /**
   * @public
   * @method takePicture
   * @description    			Uses the getPhoto method of the Capacitor Camera plugin
   *							API to return a file Uri which is then made available
   *							to the parent script as a resolved (or rejected) Promise
   * 							object courtesy of the async/await functions
   *
   * @return {Promise}
   */
  async takePicture(): Promise<any> {

    /* Define the options for the getPhoto method - particularly the source for where
       the image will be taken from (I.e. the device camera) and how we want the captured
       image data returned (I.e. base64 string or a file uri) */
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });



    /* We need to run the returned Image URL through Angular's DomSanitizer to 'trust'
       this for use within the application (I.e. so that Angular knows this isn't an
       XSS attempt or similarly malicious code) */
    this._IMAGE = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
    return this._IMAGE;
  }




  /**
   * @public
   * @method selectPhoto
   * @description    			Uses the getPhoto method of the Capacitor Camera plugin
   *							API to return a file Uri from the Photolibrary selected
   *							image which is then made available to the parent script
   *							as a resolved (or rejected) Promise object courtesy of the
   *							async/await functions
   *
   * @return {Promise}
   */
  async selectPhoto(): Promise<any> {

    /* Define the options for the getPhoto method - particularly how we want the
       image data returned (I.e. base64 string or a file uri) */
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });


    // We return the webPath property of the image object (which contains the image path)
    return image.webPath;
  }




  /* ----------------------------------------------------------------

     Web environment specific methods - used for Progressive Web Apps

     ---------------------------------------------------------------- */



  /**
   * @public
   * @method selectImage
   * @param event  {any}     	The DOM event that we are capturing from the File input field
   * @description    			Uses the FileReader API to capture the input field event,
   *							retrieve the selected image and return that as a base64 data
   *							URL courtesy of an Observable
   * @return {Observable}
   */
  selectImage(event): Observable<any> {
    return Observable.create((observer) => {
      this.handleImageSelection(event)
        .subscribe((res) => {
          observer.next(res);
          observer.complete();
        });
    });
  }




  /**
   * @public
   * @method handleImageSelection
   * @param event  {any}     	The DOM event that we are capturing from the File input field
   * @description    			Uses the FileReader API to capture the input field event,
   *							retrieve the selected image and return that as a base64 data
   *							URL courtesy of an Observable
   * @return {Observable}
   */
  handleImageSelection(event: any): Observable <any> {
    let file: any = event.target.files[0];

    this._READER.readAsDataURL(file);
    return Observable.create((observer) => {
      this._READER.onloadend = () => {
        observer.next(this._READER.result);
        observer.complete();
      }
    });
  }

}
