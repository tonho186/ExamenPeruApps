import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComplejo } from './complejo';

@Injectable({
  providedIn: 'root'
})
export class ComplejosService {

  private apiURL = this.baseUrl + "api/complejos";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getComplejos(): Observable<IComplejo[]> {
    return this.http.get<IComplejo[]>(this.apiURL);
  }

  getComplejo(complejoId: string): Observable<IComplejo> {
    let params = new HttpParams().set('incluirEventos', "true");
    return this.http.get<IComplejo>(this.apiURL + '/' + complejoId, { params: params });
  }

  createComplejo(complejo: IComplejo): Observable<IComplejo> {
    return this.http.post<IComplejo>(this.apiURL, complejo);
  }

  updateComplejo(complejo: IComplejo): Observable<IComplejo> {
    return this.http.put<IComplejo>(this.apiURL + "/" + complejo.id.toString(), complejo);
  }

  deleteComplejo(complejoId: string): Observable<IComplejo> {
    return this.http.delete<IComplejo>(this.apiURL + "/" + complejoId);
  }
}
