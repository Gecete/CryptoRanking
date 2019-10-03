import { Component } from '@angular/core';
import { QueryService } from './services/query.service';
import { ICryptoObject } from './interfaces/IcryptoObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cryptos ordered by MarketCap';
  cryptoObjects: ICryptoObject[] = [];
  searchInput : string = '';
  scrollIndex :number = 0;
  totalresults : number;

constructor(private queryService: QueryService, ) { }


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
      this.title = String(this.totalresults) + ' Cryptos ordered by MarketCap';
    }
  }, (error) => {
    console.log(error);
  });
}

  //this function is triggered by infinite scroll component, it needs to be used, otherwise the browser will froze due to 
  //the big ammount of items to display at a time.
  //this funcion is called when the scroll is nearly at the bottom of the page, there I just concat the next 10 results array shown 
  onScroll() {
    
    //keep doing this call ig there are results in the DB
    if(this.totalresults!==this.cryptoObjects.length){
      this.scrollIndex = this.scrollIndex + 100;
      this.getResults(this.scrollIndex);
    }
  }

  ngOnInit() {
    this.getResults(this.scrollIndex);
  }


}
