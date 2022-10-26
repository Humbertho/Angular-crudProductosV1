import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/shared/service/producto.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit 
{
  public productos: Producto[] = [];

  constructor(private productosService: ProductoService, private toastr: ToastrService,) 
  { }

  ngOnInit(): void 
  {
    this.cargarProductos();
  }

  public cargarProductos(): void
  {
    console.log("cargar productos");
    this.productosService.productsAll().subscribe(
      (response) => {
        if(response.status == 200)
        {
          this.productos = response.body;
          console.log("productos: " + JSON.stringify(this.productos));
        }
          
        if(response.status == 400)
        {
          this.toastr.error('Error', 'Productos no encontrados', {
            timeOut : 3000, positionClass: 'toast-top-center'
          });
        }
      }
    );
  }

  public borrar(id: Number): void 
  {
    this.productosService.delete(id).subscribe(
      (response) => {
        if(response.status == 200)
        {
          this.toastr.success('Ok', 'Producto borrado correctamente', {
            timeOut : 3000, positionClass: 'toast-top-center'
          });
          this.cargarProductos();
        }
        if(response.status == 400)
        {
          this.toastr.error('Error', 'Productos no borrado', {
            timeOut : 3000, positionClass: 'toast-top-center'
          });
        }
      }
    );
  }

  public subirId(id: Number)
  {
    localStorage.setItem("idProducto", String(id));
  }
}
