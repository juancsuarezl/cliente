import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  public listProductos: Producto[] = [];

  constructor(private productoService: ProductoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe(data =>{
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any){
    this.productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.success('El producto fue eliminado con éxito', 'Producto eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    })
  }


}
