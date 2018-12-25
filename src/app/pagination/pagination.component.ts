import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';
import {AutoService} from '../auto.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    length = 100;
    pageSize = 10;
    pageSizeOptions = [10, 20, 50];

    pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    constructor(private as: AutoService) {
    }

    ngOnInit() {

    }

    onChange(event): void {
        this.as.getAutos({limit: event.pageSize, offset: event.pageIndex});
    }

}
