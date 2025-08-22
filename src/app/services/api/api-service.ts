import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) { }

  getAll<T>(entity: string): Observable<T[]> {
    return this.http.get<any>(`${this.baseUrl}/${entity}/`);
  }


}
