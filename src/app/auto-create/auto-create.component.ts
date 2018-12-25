import {Component, OnInit} from '@angular/core';
import {AutoService} from '../auto.service';
import {Auto, CheckUp, Model} from '../models/auto';
import {MatDialog} from '@angular/material';
import {ModalAddModelComponent} from '../modal-add-model/modal-add-model.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-auto-create',
    templateUrl: './auto-create.component.html',
    styleUrls: ['./auto-create.component.scss']
})
export class AutoCreateComponent implements OnInit {

    constructor(private as: AutoService, public dialog: MatDialog,
                private route: ActivatedRoute,
                private router: Router) {

    }

    data: any;
    auto: Auto;
    selectedModelValue: any;
    selectedOilValue: any = {};
    selectedBrandValue: any = {};
    models: Array<Model> = [];
    brands: any = [];
    newCheckup: CheckUp = {
        dateStart: undefined,
        dateEnd: undefined
    };
    id: number;

    setModel(model?: Auto): void {
        if (model) {
            this.auto = model;
        } else {
            this.selectedModelValue = {};
            this.selectedBrandValue = {};
            this.auto = {
                number: '',
                person: {
                    name: '',
                    secondName: '',
                    thirdName: '',
                    address: '',
                    phone: ''
                },
                oil: {
                    name: ''
                },
                model: {
                    name: '',
                    brand: {
                        name: ''
                    },
                    category: {
                        name: ''
                    }
                }
            };
            this.newCheckup = {
                dateStart: undefined,
                dateEnd: undefined
            };
        }
    }

    ngOnInit() {
        this.selectedBrandValue = {
            name: 'hello'
        };
        this.setModel();
        this.getData();
        this.route.params.subscribe(params => {
            if (params.id) {
                this.id = params.id;
                this.as.getAutoById(params.id).subscribe(data => {
                    this.auto = data;

                    if (this.auto) {
                        this.brands.forEach(el => {
                            if (el.name === this.auto.model.brand.name) {
                                this.selectedBrandValue = el;
                            }
                        });
                        this.selectedBrandValue.models.forEach(el => {
                            if (el.name === this.auto.model.name) {
                                this.selectedModelValue = el;
                            }
                        });
                        this.data.oils.forEach(el => {
                            if (el.name === this.auto.oil.name) {
                                this.auto.oil = el;
                            }
                        });
                        console.log(this.auto);
                    }

                });
            }
        });

    }

    saveAuto(): void {
        if (this.newCheckup.dateStart && this.newCheckup.dateEnd) {
            this.auto.checkup = this.newCheckup;
        }
        if (this.selectedBrandValue.name && this.selectedModelValue.name && this.selectedModelValue.category.name) {
            this.auto.model.brand.name = this.selectedBrandValue.name;
            this.auto.model.name = this.selectedModelValue.name;
            this.auto.model.category = this.selectedModelValue.category;
            this.as.updateAuto(this.auto);
        }
        console.log(this.selectedBrandValue);
        console.log(this.selectedModelValue);
        console.log(this.newCheckup);
        console.log(this.auto);
    }

    openModelDialog(): void {
        let dialogRef = this.dialog.open(ModalAddModelComponent, {
            width: '450px',
            data: {
                brands: this.brands,
                categories: [{name: 'A'}, {name: 'B'}, {name: 'C'}]
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    addAuto(): void {
        if (this.newCheckup.dateStart && this.newCheckup.dateEnd) {
            this.auto.checkup = this.newCheckup;
        }
        if (this.selectedModelValue && this.selectedModelValue.name
            && this.selectedModelValue.category && this.selectedModelValue.category.name
            && this.selectedBrandValue.name) {
            this.auto.model.name = this.selectedModelValue.name;
            this.auto.model.category.name = this.selectedModelValue.category.name;
            this.auto.model.brand.name = this.selectedBrandValue.name;
            console.log(this.auto);

            this.as.addAuto(this.auto);
        }
        this.setModel();
    }

    onBrandChange(): void {
        console.log(this.selectedBrandValue);
    }

    getData(): void {
        this.as.getCommonInfo().subscribe((data: any) => {
            if (data) {
                this.data = data;
                let flag;
                this.data.models.map((item) => {
                    flag = false;
                    this.brands.forEach(el => {
                        if (el.name && el.name === item.brandName) {
                            let f1 = false;
                            el.models.forEach(it => {
                                if (it.name === item.modelName) {
                                    f1 = true;
                                }
                            });
                            if (!f1) {
                                el.models.push({name: item.modelName, category: {name: item.categoryName}});
                            }
                            flag = true;
                        }
                    });
                    if (!flag && item.brandName) {
                        this.brands.push({
                            name: item.brandName,
                            models: item.modelName ? [{name: item.modelName, category: {name: item.categoryName}}] : [],
                        });
                    }
                });
            }
        });
    }

}
