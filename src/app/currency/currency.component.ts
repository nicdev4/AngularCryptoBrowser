import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent implements OnInit{
  name: any | undefined;
  coin: Coin|undefined;
  constructor(private activatedRoute:ActivatedRoute, private http:HttpClient) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.name = params['name'];
    });
    this.http.get('https://api.coingecko.com/api/v3/coins/'+this.name).subscribe({next: (data:any) => {
        this.coin = new Coin();
        this.coin.name = data.name;
        this.coin.image_url = data.image.large;
        this.coin.price = data.market_data.current_price.usd;
        this.coin.description = data.description.en;
        this.coin.ath_percent_change = data.market_data.ath_change_percentage.usd.toString();
      }});
  }

}
class Coin{
  name: string|undefined;
  price: string|undefined;
  image_url: string|undefined;
  description: string|undefined;
  ath_percent_change: string|undefined;
}
