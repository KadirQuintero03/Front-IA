import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
interface Idata{
  rata:number,
  iteracion:number,
  errorMaximo:number,
  data:any
  }
  
@Injectable({
  providedIn: 'root',
})

export class TrainingService {
  private socket = io('https://9rsknq83-4000.use.devtunnels.ms/');

  sendMessage(data: Idata) {
    console.log("data a graficar",data);

    this.socket.emit('graficas', data);
  }

  entrenamiento() {
    let observable = new Observable<any>(
      (observer) => {
        this.socket.on('graficas', (data: any) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
}
