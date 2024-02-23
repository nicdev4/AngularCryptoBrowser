import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CurrenciesComponent} from "./currencies/currencies.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrenciesComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Currencies List";

}
