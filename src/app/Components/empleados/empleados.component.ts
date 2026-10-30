import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { EmpleadoService } from '../../Services/empleado.service';
import { DepartamentoService } from '../../Services/departamento.service';
import { Empleado } from '../../Entitys/empleado.model';
import { Departamento } from '../../Entitys/departamento.model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatPaginatorModule
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'dni', 'correo', 'departamento', 'sueldoBase', 'activo', 'acciones'];
  
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];
  departamentos: Departamento[] = [];
  
  filtroBusqueda: string = '';
  filtroDepartamento: number | null = null;
  filtroEstado: string = 'todos';
  
  totalEmpleados: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  
  loading: boolean = false;

  constructor(
    private empleadoService: EmpleadoService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.cargarEmpleados();
  }

  cargarDepartamentos(): void {
    this.departamentoService.listar().subscribe({
      next: (data) => {
        this.departamentos = data;
      },
      error: (err) => console.error('Error al cargar departamentos', err)
    });
  }

  cargarEmpleados(): void {
    this.loading = true;
    this.empleadoService.listar(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.empleados = data;
        this.aplicarFiltros();
        this.totalEmpleados = data.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar empleados', err);
        this.loading = false;
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.empleados];

    // Filtrar por búsqueda (nombre, apellido, dni, correo)
    if (this.filtroBusqueda.trim()) {
      const busqueda = this.filtroBusqueda.toLowerCase().trim();
      resultado = resultado.filter(emp => 
        emp.nombres?.toLowerCase().includes(busqueda) ||
        emp.apellidos?.toLowerCase().includes(busqueda) ||
        emp.dni?.toLowerCase().includes(busqueda) ||
        emp.correo?.toLowerCase().includes(busqueda)
      );
    }

    // Filtrar por departamento
    if (this.filtroDepartamento !== null && this.filtroDepartamento !== undefined) {
      resultado = resultado.filter(emp => emp.departamentoId === this.filtroDepartamento);
    }

    // Filtrar por estado
    if (this.filtroEstado === 'activo') {
      resultado = resultado.filter(emp => emp.activo === true);
    } else if (this.filtroEstado === 'inactivo') {
      resultado = resultado.filter(emp => emp.activo === false);
    }

    this.empleadosFiltrados = resultado;
  }

  limpiarFiltros(): void {
    this.filtroBusqueda = '';
    this.filtroDepartamento = null;
    this.filtroEstado = 'todos';
    this.aplicarFiltros();
  }

  cambiarPagina(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarEmpleados();
  }

  obtenerNombreDepartamento(deptId?: number): string {
    if (!deptId) return 'Sin asignar';
    const dept = this.departamentos.find(d => d.id === deptId);
    return dept ? dept.nombre : `Depto ${deptId}`;
  }

  verDetalle(empleado: Empleado): void {
    console.log('Ver detalle:', empleado);
  }

  editarEmpleado(empleado: Empleado): void {
    console.log('Editar:', empleado);
  }
}
