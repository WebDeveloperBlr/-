import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AutoService} from '../auto.service';
import {Model} from '../models/auto';


@Component({
    selector: 'app-modal-add-model',
    templateUrl: './modal-add-model.component.html',
    styleUrls: ['./modal-add-model.component.scss']
})
export class ModalAddModelComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ModalAddModelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private as: AutoService) {
    }

    selectedCategValue: any = {};
    selectedBrandValue: any = {};
    newModelValue: string = '';

    onNoClick(): void {
        this.dialogRef.close();
    }

    newBrand: any = {};
    newModel: Model = {
        name: '',
        brand: {
            name: ''
        },
        category: {
            name: ''
        }
    };

    addBrand(): void {
        this.as.addBrand(this.newBrand);
    }

    addModel(): void {
        if (this.newModelValue !== '' && this.selectedCategValue.name !== '' && this.selectedBrandValue.name !== '') {
            this.newModel.name = this.newModelValue;
            this.newModel.category.name = this.selectedCategValue.name;
            this.newModel.brand.name = this.selectedBrandValue.name;
        }
        this.as.addModel(this.newModel);
    }

    ngOnInit() {
    }

}
