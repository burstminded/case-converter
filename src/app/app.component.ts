import { Component, OnInit } from '@angular/core';
import { ConverterService } from './converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  
  constructor(public convertService: ConverterService) {}

  ngOnInit(): void {
    this.convertService.getCurrencies().subscribe()
  }
  
  
  title = 'case-converter';
}
