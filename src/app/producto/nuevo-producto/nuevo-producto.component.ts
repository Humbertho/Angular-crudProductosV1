import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/shared/service/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit 
{
  public nombre: String = '';
  public precio: Number = 0;
  public producto: Producto = {};

  public form: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.compose([Validators.required])],
    precio: ['', Validators.compose([Validators.required])]
  });

  constructor(private productosService: ProductoService, private formBuilder: FormBuilder, private toastr: ToastrService,
    private router: Router)
  { }  

  ngOnInit(): void 
  {
    console.log("form valid: " + this.form.invalid);
  }

  public cargarForm(): void
  {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      precio: ['', Validators.compose([Validators.required])]
    });
  }

  public crearNuevo(): void
  {
    this.producto.nombre = this.form.get('nombre')?.value;
    this.producto.precio = this.form.get('precio')?.value;
    this.productosService.save(this.producto).subscribe(
      (response) => {
        if(response.status == 200)
        {
          this.toastr.success('Ok', 'Producto Creado', {
            timeOut : 3000, positionClass: 'toast-top-center'
          });
        }
          
        if(response.status == 400)
        {
          this.toastr.error('Error', 'Producto no creado', {
            timeOut : 3000, positionClass: 'toast-top-center'
          });
        }
        
        this.router.navigate(["/"]);
      }
    )
  }
}
