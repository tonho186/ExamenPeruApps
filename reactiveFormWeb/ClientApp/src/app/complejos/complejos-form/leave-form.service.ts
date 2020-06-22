import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ComplejosFormComponent } from './complejos-form.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormService implements CanDeactivate<ComplejosFormComponent> {

  canDeactivate(component: ComplejosFormComponent): boolean {
    if (component.existenCambiosPendientes()) {
      return confirm("Tiene cambios pendientes, ¿Desea salir de todos modos?");
    }
    return true;
  }
  constructor() { }

}
