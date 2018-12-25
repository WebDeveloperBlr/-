import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('filterState', [
            state('true', style({
                height: 'auto'
            })),
            state('false', style({
                transform: 'translateX(10px)',
                display: 'none'
            })),
            transition('true => false', animate('100ms ease-in')),
            transition('false => true', animate('100ms ease-in'))
        ])
    ]
})
export class HomeComponent implements OnInit {

    navLinks = [
        {
            path: '/auto',
            label: 'Автомобили'
        },
        {
            label: 'Владельцы',
            path: '/people'
        }
    ];

    isFilterActive = false;

    constructor(private router: Router) {
    }

    toggleFilter(): void {
        this.isFilterActive = !this.isFilterActive;
    }

    ngOnInit() {
    }

}
