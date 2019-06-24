import { Component, OnInit } from '@angular/core';
import { CaptureService } from '../capture.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
})
export class CapturePage implements OnInit {

  ngOnInit() {
  }
  public platformIs: string = '';




  /**
   * @name imageSource
   * @type String
   * @public
   * @description               Property that stores the retrieved image file from the
   *                            selected method of the ImageProvider service for
   *                            rendering inside the component template
   */
  imageSource:string;

  constructor(private _IMAGE: CaptureService) {
  }




  /**
   * @public
   * @method captureImage
   * @description               Mobile only - Launches the ActionSheet component to allow the
   *                            user to select whether they are to capture an image using the
   *                            device camera or photolibrary
   * @return {none}
   */
  captureImage(): void {

    this._IMAGE
      .takePicture()
      .then((data) => {
        this.imageSource = data;
      })
      .catch((error) => {
        console.dir(error);
      });  }

}





