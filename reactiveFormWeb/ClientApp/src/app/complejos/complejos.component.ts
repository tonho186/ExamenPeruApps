import { Component, OnInit } from '@angular/core';
import { IComplejo } from './complejo';
import { ComplejosService } from './complejos.service';

@Component({
  selector: 'app-complejos',
  templateUrl: './complejos.component.html',
  styleUrls: ['./complejos.component.css']
})
export class ComplejosComponent implements OnInit {

  complejos: IComplejo[];

  constructor(private complejosService: ComplejosService) { }

  ngOnInit() {
    this.cargarData();
  }

  delete(complejo: IComplejo) {
    this.complejosService.deleteComplejo(complejo.id.toString())
      .subscribe(persona => this.cargarData(),
        error => console.error(error));
  }

  cargarData() {
    this.complejosService.getComplejos()
      .subscribe(complejosDesdeWS => this.complejos = complejosDesdeWS,
        error => console.error(error));
  }

}
