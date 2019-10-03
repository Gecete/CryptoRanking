import { Component } from '@angular/core';
import { QueryService } from './services/query.service';
import { ICryptoObject } from './interfaces/IcryptoObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Woodwing Task';
  cryptoObjects: ICryptoObject[] = [];
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

ngOnInit() {
  this.getResults(this.scrollIndex);
}

}
