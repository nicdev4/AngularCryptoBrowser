import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LoadingComponent} from "../loading/loading.component";
import {NotfoundComponent} from "../notfound/notfound.component";

@Component({
  selector: 'app-currency',
  standalone: true,
    imports: [HttpClientModule, LoadingComponent, NotfoundComponent],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent implements OnInit{
  name: any | undefined;
  coin: Coin|undefined;
  loading = true;
  error = false;
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
        this.coin.sparkline_url= "https://www.coingecko.com/coins/"+data.image.large.toString().split('/')[5]+"/sparkline.svg";
        this.coin.price = data.market_data.current_price.usd;
        this.coin.description = data.description.en;
        this.coin.ath_percent_change = data.market_data.ath_change_percentage.usd.toString();
        this.loading = false;
      }, error: (data: any) => {
        this.error = true;
        this.loading = false;
      }});
  }

}
class Coin{
  name: string|undefined;
  price: string|undefined;
  image_url: string|undefined;
  sparkline_url: string|undefined;
  description: string|undefined;
  ath_percent_change: string|undefined;
}
