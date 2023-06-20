import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService)
    {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: [ '', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    if(this.id !== null){
      this.productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('El producto fue actualizado exitosamente!', 'Producto Actualizado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
        this.toastr.error('No se pudo guardar el producto', 'Error al guardar producto');
      })
    } else {
        this.productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue creado exitosamente!', 'Producto Agregado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
        this.toastr.error('No se pudo guardar el producto', 'Error al guardar producto');
      })
    }

  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar producto';
      this.productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }
  }
}
