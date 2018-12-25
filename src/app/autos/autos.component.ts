import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AutoService} from '../auto.service';
import {Observable} from 'rxjs/Observable';
import {Auto} from '../models/auto';
import {Router} from '@angular/router';

@Component({
    selector: 'app-autos',
    templateUrl: './autos.component.html',
    styleUrls: ['./autos.component.scss']
})
export class AutosComponent implements OnInit {

    data: Observable<any>;
    dataSource: MatTableDataSource<Auto>;
    ELEMENT_DATA: any[];
    displayedColumns = ['id_auto', 'brand', 'model', 'number', 'category', 'oil', 'checkUp'];

    constructor(private autoService: AutoService, private router: Router) {
    }

    showAuto(event): void {
        this.router.navigate(['/auto', event.id_auto]);
        console.log(event);
    }

    ngOnInit() {
        this.autoService.getAutos().subscribe(data => {
            this.dataSource = new MatTableDataSource<Auto>(data);
        });
    }

}



