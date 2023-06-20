import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import { license } from '@syncfusion/ej2-angular-richtexteditor';
// license('@32312e312e3335UvtGy+NkFDVfsUvPcyNSsdV87M4+8L4WgvibT5c8hTg=');
import * as Syncfusion from '@syncfusion/ej2-base';
if (environment.production) {
  enableProdMode();
}
// Syncfusion.License.registerKey('<@32312e312e3335UvtGy+NkFDVfsUvPcyNSsdV87M4+8L4WgvibT5c8hTg=>');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
