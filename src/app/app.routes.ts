import {provideRouter, Routes} from '@angular/router';
import {CurrencyComponent} from "./currency/currency.component";
import {CurrenciesComponent} from "./currencies/currencies.component";
import {AppComponent} from "./app.component";
import {ApplicationConfig} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {NotfoundComponent} from "./notfound/notfound.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'currencies', component: CurrenciesComponent},
  {path: 'currency/:name', component: CurrencyComponent},
  {path: '**', component: NotfoundComponent}
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
