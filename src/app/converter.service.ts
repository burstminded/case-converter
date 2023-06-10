import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, tap } from 'rxjs';


export interface currencyReceiveObj{
  cc: string,
  rate: string

}
export interface currencyObj {
  [key: string]: number
}

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  

  currenciesAvailable: currencyObj[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  getCurrencies() {
    return this.http.get<currencyReceiveObj[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .pipe(
      delay(3000),
      tap(currencies => {
        for(let i = 0; i < currencies.length; i++) {
          let currency: currencyReceiveObj = currencies[i];
          if(currency.cc == 'USD' || currency.cc == 'EUR') {
            this.currenciesAvailable.push({[currency.cc]:+currency.rate})
          }
        }
        this.currenciesAvailable.push({'UAH':1});
      })
    )
  }
  
  
}
