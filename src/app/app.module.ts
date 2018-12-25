import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {AutosComponent} from './autos/autos.component';
import {PeopleComponent} from './people/people.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AutoService} from './auto.service';
import {FilterBarComponent} from './filter-bar/filter-bar.component';
import {PaginationComponent} from './pagination/pagination.component';
import {AutoCreateComponent} from './auto-create/auto-create.component';
import {ModalAddModelComponent} from './modal-add-model/modal-add-model.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      AutosComponent,
      PeopleComponent,
      FilterBarComponent,
      PaginationComponent,
      AutoCreateComponent,
      ModalAddModelComponent,
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatTabsModule,
      NgbModule.forRoot(),
      CdkTableModule,
      MatTableModule,
      HttpClientModule,
      AngularFontAwesomeModule,
      MatPaginatorModule,
      FormsModule,
      MatSelectModule,
      MatDialogModule,
      MatCheckboxModule
  ],
    entryComponents: [ModalAddModelComponent, AutoCreateComponent],
    providers: [
        AutoService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
