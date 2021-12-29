import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnalyzeMoodService } from '../analyze-mood.service';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.scss']
})

export class CaptureImageComponent implements OnInit {

  @ViewChild("videoCapture")
  public video!: ElementRef;
  @ViewChild("imageCaptureCanvas")
  public image!: ElementRef;

  public message:{title:string, body:string} = {title:'',body:''};
  public capture:string = '';
  public currentEmotions:[number,number,number,number,number] = [50, 50, 50, 50, 50];
  public EMOTIONS:string[] = ['anger', 'disgust', 'fear', 'happiness', 'sadness'];
  public webcamAccess:boolean = false;

  constructor(private analyzeMoodService:AnalyzeMoodService, 
              private db:DatabaseService, public authService:AuthService) { }

  ngOnInit(): void {
  }

  getVideo = () => {
    this.capture = '';
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.webcamAccess = true;
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      })
    }
  }

  stopVideo = () => {
    this.video.nativeElement.pause();
    this.video.nativeElement.srcObject.getVideoTracks()[0].stop();
  }

  captureImage = () => {
    this.image.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.capture = this.image.nativeElement.toDataURL("image/png");
    this.stopVideo();
  }

  analyzeImage = () => {
    //convert base 64 image to blob to send to Mood service as form data
    fetch(this.capture)
    .then(data => data.blob())
    .then(image => {
      const formData = new FormData();
      formData.append('files', image);

      //send image for analysis
      this.analyzeMoodService.analyzePhoto(formData).subscribe((response) => {
        if(response.photos && response.photos.length > 0){
          const mood = response.photos[0].tags[0].attributes;
          this.EMOTIONS.forEach((emotion, index) => {
            this.currentEmotions[index] = mood[emotion] ? mood[emotion]["confidence"]:0;
          })
        }else{
          console.log("Mood service down")
        }
      })

    })
    console.log('analyzing...')
  }

  uploadMoodPoint = () => {
    this.authService.auth.currentUser.then(user => {
      if(user){
        this.db.insertMoodData(user.uid, {attributes: this.currentEmotions}) 
          .then(res => {
            console.log(res)
            this.message.title = "Saved";
            this.message.body = "Your emotional state has been saved.";
          })
          .catch(err => {
            this.message.title = "Error";
            this.message.body = "Sorry, something went wrong. Please try to save again at a later time.";
          });
      }
    })  
  }
}