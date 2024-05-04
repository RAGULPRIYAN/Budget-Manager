import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myionicapp',
  appName: 'MyIonicApp',
  webDir: 'www',
  plugins: {
    PushNotifications: {
        presentationOptions: ['badge', 'sound', 'alert']
    }
}

  
};

export default config;
