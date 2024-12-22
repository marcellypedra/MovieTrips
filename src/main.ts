import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { SplashScreen } from '@capacitor/splash-screen';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  const initializeApp = async () => {
    // Simulate some startup logic
    setTimeout(() => {
      SplashScreen.hide(); // Hide splash screen manually
    }, 3000); // Adjust timing as needed
  };
  
  initializeApp();
  