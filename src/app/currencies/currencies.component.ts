import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.css'
})
export class CurrenciesComponent implements OnInit{
  currencies: any= [];
  default_currencies: any = [];
  title = 'Currencies List';
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {}

  loading = true;

  search_form = this.formBuilder.group({
    query: '',
  })

  openCoin(name: string){
    this.router.navigateByUrl('/currency/', {state: {name: name}})
  }

  getCurrencies(){
    return this.currencies;
  }

  search(event: any){
    let result: any = [];
    let query = event.target.value;
    alert(query);
    if(query != null) {
      if (query.length <= 0) {
        this.currencies = this.default_currencies;
      } else {
        for (let item of this.getCurrencies()) {
          if (item.name.toLowerCase().includes(query.toLowerCase()) || query.toString().toLowerCase() === item.name.toLowerCase()) {
            result.push(item);
          }
        }
        this.currencies = result;
        console.log(this.currencies);
      }
    }
  }

  ngOnInit() {
    this.http.get("https://api.coingecko.com/api/v3/search/trending")
      .subscribe({
        next: (data: any) => {
          for(let el of data.coins){
            this.currencies.push(new Currency(el.item.id, el.item.name, el.item.symbol));
          }
          this.loading = false;
        }
      });
      this.default_currencies = this.currencies;
  }
}

class Currency{
  name: string | undefined;
  symbol: string | undefined
  id: string | undefined;

  constructor(id:string, name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
    this.id = id;
  }
}
