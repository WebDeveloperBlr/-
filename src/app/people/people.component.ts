import {Component, OnInit} from '@angular/core';
import {AutoService} from '../auto.service';
import {MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Auto} from '../models/auto';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

    data: Observable<any>;
    dataSource: MatTableDataSource<Auto>;
    ELEMENT_DATA: any[];
    displayedColumns = ['id_auto', 'personName', 'brand', 'model', 'number', 'checkUp'];

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
