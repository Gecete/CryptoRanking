import { Component, OnInit } from '@angular/core';
import { QueryService } from './services/query.service';
import { ICryptoObject } from './interfaces/IcryptoObject';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchFilterPipe]
})
export class AppComponent implements OnInit {

  title = 'Cryptos ordered by MarketCap';
  cryptoObjects: ICryptoObject[] = [];
  searchInput : string = '';
  scrollIndex :number = 0;
  totalresults : number;
  filter = this.searchFilterPipe;

  constructor(private queryService: QueryService, private searchFilterPipe: SearchFilterPipe, private spinner: NgxSpinnerService) { }

  getResults = (offset: number) => {
    this.queryService.get(offset).subscribe(value => {

      if (value.status === 'success') {
        //Everything went fine, let's map the data
        let cont = this.cryptoObjects.length;
        value.data.coins.map(coin => {
          cont = cont + 1
          let coinInfo = <ICryptoObject>{};
          coinInfo.id = cont;
          coinInfo.name = coin.name;
          coinInfo.description = coin.description;
          coinInfo.value = Number(coin.price).toFixed(3);
          coinInfo.code = coin.symbol;
          coinInfo.symbol = coin.iconUrl;
          coinInfo.link = coin.websiteUrl;
          coinInfo.color = coin.color;

          this.cryptoObjects.push(coinInfo)
        });
        this.totalresults =value.data.stats.total;
        this.title = 'Top 500 Cryptos ordered by MarketCap';
        this.spinner.hide();
      }
    }, (error) => {
      this.spinner.hide();
      console.log(error);
      this.scrollIndex=0;
      window.scrollTo(0,0)
    });
  }

  //this function is triggered by infinite scroll component, it needs to be used, otherwise the browser will froze due to
  //the big ammount of items to display at a time.
  //this funcion is called when the scroll is nearly at the bottom of the page, there I just concat the next 10 results array shown
  onScroll() {

    //keep doing this call ig there are results in the DB
    if(500>this.cryptoObjects.length){
      this.scrollIndex = this.scrollIndex + 100;
      this.spinner.show();
      this.getResults(this.scrollIndex);
    }
  }

  ngOnInit() {
    this.spinner.show();
    this.getResults(this.scrollIndex);
  }
}
