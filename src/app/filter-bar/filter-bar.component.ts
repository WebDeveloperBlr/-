import {Component, OnInit} from '@angular/core';
import {Auto} from '../models/auto';
import {AutoService} from '../auto.service';

@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

    constructor(private as: AutoService) {
    }

    checkup: any;

    filterObj: Auto = {
        number: '',
        person: {
            name: '',
            secondName: ''
        },
        model: {
            name: '',
            category: {
                name: ''
            },
            brand: {
                name: ''
            }
        },
        oil: {
            name: ''
        }
    };

    ngOnInit() {

    }

    filterData(): void {
        this.as.getAutos({limit: 10, offset: 0, filterObj: this.filterObj});
    }

    onChange(): void {
        if (this.checkup) {
            this.filterObj.checkup = {
                dateStart: undefined,
                dateEnd: undefined
            };
        }
        console.log(this.filterObj);
    }

}
