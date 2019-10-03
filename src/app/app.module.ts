import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BoxComponent } from './components/box/box.component';
import { QueryService } from './services/query.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [QueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
