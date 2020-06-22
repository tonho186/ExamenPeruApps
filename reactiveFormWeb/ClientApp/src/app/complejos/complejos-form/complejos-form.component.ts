import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IComplejo } from '../complejo';
import { ComplejosService } from '../complejos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { EventosService } from '../../eventos/eventos.service';

@Component({
  selector: 'app-complejos-form',
  templateUrl: './complejos-form.component.html',
  styleUrls: ['./complejos-form.component.css']
})
export class ComplejosFormComponent implements OnInit {
  
  constructor(private fb: FormBuilder,
    private complejosService: ComplejosService,
    private eventosService: EventosService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  modoEdicion: boolean = false;
  formGroup: FormGroup;
  complejoId: number;
  eventosABorrar: number[] = [];
  ignorarExistenCambiosPendientes: boolean = false;

  existenCambiosPendientes(): boolean {
    if (this.ignorarExistenCambiosPendientes) { return false; };
    return !this.formGroup.pristine;
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      localizacion: '',
      jefe: '',
      area: 0,
      eventos: this.fb.array([])
    });

    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }

      this.modoEdicion = true;

      this.complejoId = params["id"];

      this.complejosService.getComplejo(this.complejoId.toString())
        .subscribe(complejo => this.cargarFormulario(complejo),
          error => this.router.navigate(["/complejos"]));

    });
  }

  agregarEvento() {
    let eventoArr = this.formGroup.get('eventos') as FormArray;
    let eventoFG = this.construirEvento();
    eventoArr.push(eventoFG);
  }

  construirEvento() {
    return this.fb.group({
      id: '0',
      fecha: '',
      duracion: '',
      numParticipantes: 0,
      numComisarios: 0,
      complejoId: this.complejoId != null ? this.complejoId : 0
    });
  }

  removerEvento(index: number) {
    let eventos = this.formGroup.get('eventos') as FormArray;
    let eventoRemover = eventos.at(index) as FormGroup;
    if (eventoRemover.controls['id'].value != '0') {
      this.eventosABorrar.push(<number>eventoRemover.controls['id'].value);
    }
    eventos.removeAt(index);
  }

  cargarFormulario(complejo: IComplejo) {

    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";

    this.formGroup.patchValue({
      localizacion: complejo.localizacion,
      jefe: complejo.jefe,
      area: complejo.area
    });

    let eventos = this.formGroup.controls['eventos'] as FormArray;
    complejo.eventos.forEach(evento => {
      let eventoFG = this.construirEvento();
      eventoFG.patchValue(evento);
      eventos.push(eventoFG);
    });
  }

  save() {
    this.ignorarExistenCambiosPendientes = true;
    let complejo: IComplejo = Object.assign({}, this.formGroup.value);
    console.table(complejo);

    if (this.modoEdicion) {
      // editar el registro
      complejo.id = this.complejoId;
      this.complejosService.updateComplejo(complejo)
        .subscribe(complejo => this.borrarComplejos(),
          error => console.error(error));
    } else {
      // agregar el registro

      this.complejosService.createComplejo(complejo)
        .subscribe(complejo => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  borrarComplejos() {
    if (this.eventosABorrar.length === 0) {
      this.onSaveSuccess();
      return;
    }

    this.eventosService.deleteEventos(this.eventosABorrar)
      .subscribe(() => this.onSaveSuccess(),
        error => console.error(error));
  }

  onSaveSuccess() {
    this.router.navigate(["/complejos"]);
  }

}
