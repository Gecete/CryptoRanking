import { Component, OnInit, Input } from '@angular/core';
import { ICryptoObject } from '../../interfaces/IcryptoObject';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input('info') info: ICryptoObject;

  constructor() { }

  ngOnInit() {
  }

}
