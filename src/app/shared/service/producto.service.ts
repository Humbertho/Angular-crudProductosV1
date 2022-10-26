import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { APIs } from '../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductoService 
{
  constructor(private httpClient: HttpClient) 
  { }

  public productsAll(): Observable<any>
  {
    return this.httpClient.get<Producto[]>(APIs.productos.productAll, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public productById(id: Number): Observable<any>
  {
    return this.httpClient.get<Producto>(APIs.productos.productById + id, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public productByName(name: String): Observable<any>
  {
    return this.httpClient.get<Producto>(APIs.productos.productByName + name, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public save(product: Producto): Observable<any>
  {
    return this.httpClient.post<any>(APIs.productos.productCreate, product, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public update(id: Number, product: Producto): Observable<any>
  {
    return this.httpClient.put<any>(APIs.productos.productUpdate + id, product, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public delete(id: Number): Observable<any>
  {
    return this.httpClient.delete<any>(APIs.productos.productDelete + id, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }
}
