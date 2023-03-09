import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoadoffComponent} from "./loadoff/loadoff.component";
import {HttpClientModule} from "@angular/common/http";
import {QueryComponent} from "./query/query.component";
import {provideQueryClientOptions} from "@ngneat/query";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoadoffComponent,
    HttpClientModule,
    QueryComponent
  ],
  providers: [
    provideQueryClientOptions({
      defaultOptions: {
        queries: {refetchOnWindowFocus: false, }
      },
    }),],
  bootstrap: [AppComponent]
})
export class AppModule {
}
