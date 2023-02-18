import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {
  //Propiedades
  tituloCuestionario!: string;
  descripcionCuestionario!: string;
  listPreguntas: Pregunta[] = [];

  //Variables
  loading = false;

  constructor(private cuestionarioService: CuestionarioService,
    private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta: Pregunta): void {
    this.listPreguntas.push(pregunta);
  }

  eliminarPregunta(index: number): void {
    this.listPreguntas.splice(index, 1);
  }
  guardarCuestionario(): void {
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    };

    this.loading = true;
    //Enviamos cuestionario al back-end
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe({
      next: data => {
        this.toastr.success('El cuestionario fue registrado con éxito', 'Cuestionario Registrado');
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: err => {
        this.toastr.error("Opps... Ocurriço un error", 'Error!');
        this.router.navigate(['/dashboard']);
        this.loading = false;
      }
    });

  }

}
