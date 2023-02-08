import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContatosService } from './contatos.service';
import { ContatosComponent } from './contatos/contatos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';


@NgModule({
  declarations: [
    AppComponent,
    ContatosComponent,
    ContatoDetalheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ContatosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
