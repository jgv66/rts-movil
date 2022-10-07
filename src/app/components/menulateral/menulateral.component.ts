import { Component, OnInit } from '@angular/core';
import { BaselocalService } from '../../services/baselocal.service';

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.scss'],
})
export class MenulateralComponent implements OnInit {

  constructor( public datos: BaselocalService ) { }

  ngOnInit() {}

}
