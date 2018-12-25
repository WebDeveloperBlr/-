import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Auto, Model} from './models/auto';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AutoService {

    constructor(private _http: HttpClient) {
    }

    private URL = 'http://localhost:8080/auto';
    private createUrl = 'http://localhost:8080/create';
    Autos: BehaviorSubject<Auto[]> = BehaviorSubject.create(undefined);

    filterObj: any = {};
    commonData = new BehaviorSubject(undefined);

    data = new BehaviorSubject(undefined);
    auto = new BehaviorSubject(undefined);

    getCommonInfo(): Observable<any> {
        this._http.get('http://localhost:8080/common').subscribe(data => {
            this.commonData.next(data);
        });
        return this.commonData.asObservable();
    }

    getAutos(data: any = {limit: 10, offset: 0, filterObj: {}}): Observable<any> {
        if (data.filterObj) {
            this.filterObj = data.filterObj;
        }
        let params = {
            limit: data.limit,
            offset: data.offset,
            filterObj: JSON.stringify(this.filterObj)
        };
        console.log(params);
        this._http.get(this.URL, {params: params}).subscribe(data => {
            this.data.next(data);
        });
        return this.data.asObservable();
    }

    addAuto(newAuto: Auto): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this._http.post<Auto>(this.createUrl, newAuto, httpOptions).subscribe();
    }

    addBrand(newBrand: any): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this._http.post('http://localhost:8080/addBrand', newBrand, httpOptions).subscribe(() => {
            this.getCommonInfo();
        });
    }

    updateAuto(newAuto: Auto): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this._http.put('http://localhost:8080/auto/' + newAuto.id_auto, newAuto, httpOptions).subscribe();
    }

    getAutoById(id: any): Observable<any> {
        this._http.get('http://localhost:8080/auto/' + id).subscribe(data => {
            this.auto.next(data);
        });
        return this.auto.asObservable();
    }

    addModel(newModel: Model): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this._http.post('http://localhost:8080/addModel', newModel, httpOptions).subscribe(() => {
            this.getCommonInfo();
        });
    }

}
