import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private apiURL = this.baseUrl + "api/eventos";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  deleteEventos(ids: number[]): Observable<void> {
    return this.http.post<void>(this.apiURL + "/delete/list", ids);
  }

}
