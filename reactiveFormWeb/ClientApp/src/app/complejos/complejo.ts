import { IEvento } from "../eventos/evento";

export interface IComplejo {
  id: number
  localizacion: string;
  jefe: string;
  area: number;
  eventos: IEvento[];
}
