import { Routes } from "@angular/router";
import { DetalleProductoComponent } from "src/app/producto/detalle-producto/detalle-producto.component";
import { EditarProductoComponent } from "src/app/producto/editar-producto/editar-producto.component";
import { ListaProductoComponent } from "src/app/producto/lista-producto/lista-producto.component";
import { NuevoProductoComponent } from "src/app/producto/nuevo-producto/nuevo-producto.component";

export const appRoute: Routes = [
    {
        path: '', 
        pathMatch: 'full',
        component: ListaProductoComponent
    },
    {
        path: 'detail/:id', 
        pathMatch: 'full',
        component: DetalleProductoComponent
    },
    {
        path: 'nuevo', 
        pathMatch: 'full',
        component: NuevoProductoComponent
    },
    {
        path: 'editar/:id', 
        pathMatch: 'full',
        component: EditarProductoComponent
    },
    {
        path: '**',
        redirectTo: '', 
        pathMatch: 'full'
    }
]