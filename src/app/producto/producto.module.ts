import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ListaProductoComponent } from './lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        DetalleProductoComponent,
        EditarProductoComponent,
        ListaProductoComponent,
        NuevoProductoComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
  })

  export class ProductoModule {}