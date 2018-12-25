import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AutoCreateComponent} from './auto-create.component';

describe('AutoCreateComponent', () => {
    let component: AutoCreateComponent;
    let fixture: ComponentFixture<AutoCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutoCreateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutoCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
