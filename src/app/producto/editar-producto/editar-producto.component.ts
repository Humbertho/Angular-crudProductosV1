import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/shared/service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit 
{
  public formUpdate: FormGroup;
  public productoUpdate: Producto;
  public idProducto: Number;

  constructor(private productosService: ProductoService, private toastr: ToastrService,
    private formBuilder: FormBuilder, private router: Router) 
  { }

  ngOnInit(): void 
  {
    if(!localStorage.getItem("idProducto"))
    {
      this.router.navigate(["/"]);
    }
    this.cargarForm();
    this.informacioProductos();
  }

  public cargarForm(): void
  {
    this.formUpdate = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      precio: ['', Validators.compose([Validators.required])]
    });
  }

  public informacioProductos(): void
  {
    this.idProducto = Number(localStorage.getItem("idProducto"));

    this.productosService.productById(this.idProducto).subscribe(
      (response) => {
        if(response.status == 200)
        {
          this.productoUpdate = response.body;
          console.log("productos: " + JSON.stringify(this.productoUpdate));
          this.formUpdate.controls['nombre'].setValue(this.productoUpdate.nombre);
          this.formUpdate.controls['precio'].setValue(this.productoUpdate.precio);
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

  public editarProducto(): void 
  {
    console.log("nombre: " + this.formUpdate.get('nombre').value);
    console.log("precio: " + this.formUpdate.get('precio').value);
    this.productoUpdate.nombre = this.formUpdate.get('nombre').value;
    this.productoUpdate.precio = this.formUpdate.get('precio').value;
    console.log("productos a actualizar: " + JSON.stringify(this.productoUpdate));
    this.productosService.update(this.idProducto, this.productoUpdate).subscribe(
      (response) => {
        if(response.status == 200)
        {
          this.toastr.success('Ok', 'Producto actualizado correctamente', {
            timeOut : 3000, positionClass: 'toast-top-center'
          });

          this.router.navigate(["/"]);
        }

        if(response.status == 400)
        {
          this.toastr.error('Danger', 'Producto no se pudo actualizar', {
            timeOut : 3000, positionClass: 'toast-top-center'
          });
        }
      }
    );
  }
}
