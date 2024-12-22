import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  @ViewChild('datePicker', { static: false }) datePicker!: HTMLIonDatetimeElement;
  
  name: string = ''; 
  email: string = ''; 
  destination: string = ''; 
  movieName: string = ''; 
  selectedDateFrom: string = '';
  selectedDateTo: string = '';  
  isCalendarOpen: boolean = false;
  activeCalendar: 'from' | 'to' | null = null;
  constructor(private router: Router, private toastController: ToastController) { 

    this.selectedDateFrom = '';
    this.selectedDateTo= '';

  }
//Hiding calendar
  toggleCalendar(calendar: 'from' | 'to') {
    if (this.activeCalendar === calendar) {
      this.isCalendarOpen = !this.isCalendarOpen;
    } else {
      this.isCalendarOpen = true;
      this.activeCalendar = calendar;
    }
  }
  
//Handling calendar
  onDateChange(calendar: 'from' | 'to', event: any) {
    
    if (calendar === 'from') {
      this.selectedDateFrom = event.detail.value; 
    } else {
      this.selectedDateTo = event.detail.value;  
    }
    this.isCalendarOpen = false; 
    this.activeCalendar = null; 
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

  sendMsg(){
  this.presentToast('Thank you for your message! Our team will return to you soon! ', 'success');
  this.router.navigate(['/tab1']);
}

  ngOnInit() {}

  }
