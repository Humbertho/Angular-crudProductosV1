import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/shared/service/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit 
{
  public productoDetalle: Producto;
  public idProducto: Number;

  constructor(private productosService: ProductoService, private toastr: ToastrService, private router: Router) 
  { }

  ngOnInit(): void 
  {
    if(!localStorage.getItem("idProducto"))
    {
      this.router.navigate(["/"]);
    }
    this.informacioProductos();
  }

  public informacioProductos(): void
  {
    this.idProducto = Number(localStorage.getItem("idProducto"));

    this.productosService.productById(this.idProducto).subscribe(
      (response) => {
        if(response.status == 200)
        {
          this.productoDetalle = response.body;
        }
          
        if(response.status == 400)
        {
          this.toastr.error('Error', 'Producto no encontrado', {
            timeOut : 3000, positionClass: 'toast-top-center'
          });
        }
      }
    );

    localStorage.removeItem("idProducto");
  }

  public regresar(): void
  {
    this.router.navigate(["/"]);
  }
}
