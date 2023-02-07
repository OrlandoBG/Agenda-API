import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from './contatos/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

    salvar(contato: Contato): Observable<Contato>{
      return this.http.post<Contato>(this.url, contato);
    }

    list(): Observable<Contato[]>{
      return this.http.get<any>(this.url);
    }

    favorite(contato:Contato): Observable<any>{
      return this.http.patch(`${this.url}/${contato.id}/favorito`, null);
    }

    upload(contato: Contato, formData: FormData): Observable<any>{
      return this.http.put(`${this.url}/${contato.id}/foto`, formData, {responseType: 'blob'});
    }

   
}
