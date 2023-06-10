import { Component } from '@angular/core';
import { ConverterService, currencyObj } from '../converter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  

  constructor(public converter: ConverterService) {}
  
  
  
 
}
