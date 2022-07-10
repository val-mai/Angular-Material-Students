import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { HeaderModule } from './header/header.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsPage } from './pages/students/students.page';
import { DialogAddModule } from './dialog-add/dialog-add.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthModule } from './auth/auth.module';
import { FooterComponent } from './footer/footer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    StudentsPage,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    DialogAddModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    AuthModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
