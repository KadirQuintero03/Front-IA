import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pesosType } from '../interface/variables';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}
  mostrar(archivo: any, http: HttpClient): Observable<any> {
    const formData = new FormData();
    formData.append('file', archivo, archivo.name);
    const url = 'https://sensor-ia-eqnq.onrender.com/file';

    return http.post(url, formData);
  }
}
