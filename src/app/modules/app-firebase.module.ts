import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {environment} from '../../environments/environment';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  exports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    {provide: StorageBucket, useValue: environment.fireBaseConfig.storageBucket}
  ]
})
export class AppFirebaseModule {
}
