import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ICryptoObject } from '../../interfaces/IcryptoObject';
declare var $: any;
@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements AfterViewInit {
  @Input('info') info: ICryptoObject;
  constructor() { }

  ngAfterViewInit() {
    $(document).ready(function () {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    });
  }
}

