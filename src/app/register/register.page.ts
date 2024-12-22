import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  isPasswordVisible: boolean = false; 
  confirmPassword: string = '';
  isConfirmPasswordVisible: boolean = false; 


  constructor(private router: Router, private toastController: ToastController) { }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
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

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.presentToast('Passwords do not match.', 'danger');
      return;
    }

    // Simulate registration success and Redirect back to Login page
    this.presentToast('Registration successful!', 'success');
    this.router.navigate(['/login']);
  }

  BackLogin(){
    console.log('Navigating to Login...');
    this.router.navigate(['/login']);
  }


  ngOnInit() {
  }

}
