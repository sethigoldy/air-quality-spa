import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
export const WS_ENDPOINT = environment.wsEndpoint;

@Injectable({
  providedIn: 'root'
})
export class DataService {

    public connect(): Subject<any> {
        return webSocket({
            url: 'wss://city-ws.herokuapp.com/',
            closeObserver: {
                next(closeEvent) {
                    console.error(closeEvent)
                    alert("There's an error connecting with data source at this moment.");
                }
            }
        });
    }
}