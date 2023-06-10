import { Component, OnInit } from '@angular/core';
import { ConverterService } from '../converter.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-converter-body',
  templateUrl: './converter-body.component.html',
  styleUrls: ['./converter-body.component.css']
})
export class ConverterBodyComponent implements OnInit {

  priceUSD: number = 20
  priceEUR: number = 24
  
  currencyArr: string[] = []

  convertGroup = new FormGroup({
    leftInput: new FormControl('1'),
    leftSelect: new FormControl('USD'),
    rightInput: new FormControl('20'),
    rightSelect: new FormControl('UAH')
  })



  ngOnInit(): void {

    this.convertGroup.disable()

    setTimeout(() => {
      this.currencyArr = Object.keys(this.converter.currenciesAvailable);
      this.priceUSD = this.converter.currenciesAvailable['USD'];
      this.priceEUR = this.converter.currenciesAvailable['EUR'];
      this.convertGroup.enable()
    }), 4002
  }

  constructor(public converter: ConverterService,
              private formBuilder: FormBuilder) {}

  handleChange(side: string) {
    let leftNumber = this.convertGroup.value.leftInput;
    let leftCurr = this.convertGroup.value.leftSelect;
    let rightNumber = this.convertGroup.value.rightInput;
    let rightCurr = this.convertGroup.value.rightSelect;

    if(!leftNumber || !rightNumber || !leftCurr || !rightCurr) {
      console.log('insufficent currency or value');
      return;
    }

    if(side === 'left') {
      let res = (+leftNumber * (this.converter.currenciesAvailable[rightCurr] / this.converter.currenciesAvailable[leftCurr])).toFixed(2)
      this.convertGroup.patchValue({
        rightInput: res
      }) 
      } else if (side === 'right') {
        let res = (+rightNumber * (this.converter.currenciesAvailable[leftCurr] / this.converter.currenciesAvailable[rightCurr])).toFixed(2)
      this.convertGroup.patchValue({
        leftInput: res
      })
    }
  }
}
