export class Producto 
{
    id?: Number;
    nombre?: String;
    precio?: Number;

    constructor(nombre: String, precio: Number) 
    {
      this.nombre = nombre;
      this.precio = precio;
    }
}
