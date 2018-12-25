import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalAddModelComponent} from './modal-add-model.component';

describe('ModalAddModelComponent', () => {
    let component: ModalAddModelComponent;
    let fixture: ComponentFixture<ModalAddModelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalAddModelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalAddModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
