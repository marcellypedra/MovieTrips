import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss'],
  providers: [Geolocation]
})
export class NewpostComponent  implements OnInit {  

  
  @Output() onAddPost = new EventEmitter<any>(); // Emit post data

  post = {
    MovieName: '',
    description: '',
    location: {
      latitude: 0,
      longitude: 0,
      city: '',  
      country: ''  
    },
    media: { src: '', type: '' }, 
    user: '',
  };

  constructor(private http: HttpClient, private postService: PostService, private geolocation: Geolocation, private router: Router,private cdRef: ChangeDetectorRef, private toastController: ToastController) {}
  
    // Utility function to convert Base64 to Blob
  base64ToBlob(base64: string, contentType: string): Blob {
  
    let base64String = base64;
    if (base64.startsWith('data:')) {
      const parts = base64.split(',');
      if (parts.length > 1) {
        base64String = parts[1]; 
      }
    }

  
    console.log('Base64 string:', base64String);

    try {
      const byteCharacters = atob(base64String); // Decode Base64 string
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
  
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
  
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
  
      return new Blob(byteArrays, { type: contentType });
    } catch (error) {
      console.error('Failed to decode Base64 string:', error);
      throw new Error('Invalid Base64 string');
    }
  }

   // Function to activate geolocation and get current location
   getLocation(): void {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        // Setting latitude and longitude
        const latitude = resp.coords.latitude;
        const longitude = resp.coords.longitude;

        // Set location coordinates
        this.post.location.latitude = latitude;
        this.post.location.longitude = longitude;

        // Fetch city and country using reverse geocoding
        this.getCityCountry(latitude, longitude);
      })
      .catch((error) => {
        console.error('Error getting location', error);
      });
  }

  // Fetch city and country from OpenCage
  getCityCountry(latitude: number, longitude: number): void {
    const apiKey = '10159284d33e4f71b89cc8a046107092'; 
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

    this.http.get(url).subscribe((response: any) => {
      if (response.results && response.results[0]) {
        const city = response.results[0].components.city || '';
        const country = response.results[0].components.country || '';
        
        // Set city and country in post object
        this.post.location.city = city;
        this.post.location.country = country;

        console.log('Location details:', city, country);
      }
    }, (error) => {
      console.error('Error fetching location details:', error);
    });
  }

  blobUrl: string | null = null;
   
  // Function to activate camera or choose from gallery(ActionSheet)
  async openCamera(): Promise<void> {
    
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Choose Media';
    actionSheet.buttons = [
      {
        text: 'Take Photo',
        handler: async () => {
          // Open camera to take a photo
          
          const photo = await Camera.getPhoto({
            quality: 70,
            resultType: CameraResultType.Base64, // Use Base64 encoding for the image
            source: CameraSource.Camera, 
          });

          const blob = this.base64ToBlob(photo.base64String || '', 'image/png');
          const blobUrl = URL.createObjectURL(blob);
          
        
          
          this.post.media = {
            src: blobUrl,  
            type: 'image'
          }
        
          console.log('Captured Image:', this.post.media);
        }
      },
    
    
      {
        text: 'Choose from Gallery',
        handler: async () => {
          // Open gallery to pick an image
          
          const photo = await Camera.getPhoto({
            quality: 70,
            resultType: CameraResultType.Base64, // Use Base64 encoding for the image
            source: CameraSource.Photos, 
          });

          const blob = this.base64ToBlob(photo.base64String || '', 'image/png');
          const blobUrl = URL.createObjectURL(blob);

        
        
        this.post.media = {
          src: blobUrl,  
          type: 'image' 
        };
        console.log('Selected Image from Gallery:', this.post.media);
      }
      },

    
      {
        text: 'Cancel',
        role: 'cancel',
      }
    ];

    document.body.appendChild(actionSheet);
    await actionSheet.present();
  }

  
  createPost(): void {
    if (!this.post.media.src || !this.post.media.type) {
      this.presentToast('You must provide an image or video.');
      return; 
    }


      // Check if the media is an image or video and set the type accordingly
      this.postService.addPost(this.post); 
      console.log(this.post);
      this.presentToast('New Post Added:')
      this.resetForm(); // Reset the form after submission
      this.router.navigate(['/tab1']);
  }

  resetForm(): void {
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl); // Revoke the Blob URL when resetting
      this.blobUrl = null; // Clear the Blob URL reference
    }
    this.post = {
      MovieName: '',
      description: '',
      location: { latitude: 0, longitude: 0, city: '', country: '' },
      media:{src:'', type:''},
      user: '',
    };

    this.post = Object.assign({}, this.post); 

    
    this.cdRef.detectChanges();
  }

  
  BackPosts(){    
    console.log('Navigating to tab1...');
    this.router.navigate(['/tab1']);
  }

    
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000, 
      position: 'bottom', 
      color, 
    });
    toast.present();
  }

  

ngOnInit() {}

}



