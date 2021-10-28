import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}


// we tell Angular to start this application with this module in mind (AppModulle)
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
