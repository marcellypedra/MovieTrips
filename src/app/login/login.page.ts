import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false; 

  constructor(private router: Router, private toastController: ToastController) {
    
    this.router.events.subscribe(event => {
      console.log('Routing event:', event);
    });
   }

  togglePasswordVisibility() {
   this.isPasswordVisible = !this.isPasswordVisible;
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

  onLogin() {
    
    if (this.email === 'webtech@test.com' && this.password === 'webtech2025') {
      this.presentToast('Login successful!', 'success');
      this.router.navigate(['/tab1']);
    } else {
      this.presentToast('Invalid email or password.', 'danger');
    }
  }

  onRegister() {
    
    this.router.navigate(['/register']);
  }


ngOnInit() {
}

}


