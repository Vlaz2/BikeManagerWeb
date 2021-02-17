import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ServerConnectionService } from '../services/server-connection.service';
import { TypeBike } from 'src/app/models/typeBike';
import { Bike } from '../models/bike';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TypeBikeService {

    private _typebikes: TypeBike[];

    constructor(private server: ServerConnectionService) { }

    get typeBikes() {
        if (this._typebikes == null || this._typebikes.length == 0) {
             this.server.getQuery('/typebike').subscribe(data => {
                this._typebikes = data as TypeBike[];;
            },
            (err: HttpErrorResponse) => {
                console.log(err.error)
            });
        }
        return this._typebikes;
    }
}