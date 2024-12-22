import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MovieTrips',
  webDir: 'www',
 // bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, 
      backgroundColor: '#e6c6b8', 
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
