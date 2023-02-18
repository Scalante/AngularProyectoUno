import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {

  //Propiedades
  nuevaPregunta: FormGroup;
  pregunta!: Pregunta;

  //Variables
  respuestaCorrecta = 0;

  @Output() enviarPregunta = new EventEmitter<Pregunta>();

  constructor(private fb: FormBuilder,
    private toastr: ToastrService) {
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.agregarRespuestaPorDefecto();
  }

  //Devuelve FormArray de respuestas
  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }

  //Agregar respuestas al array
  agregarRespuesta(): void {
    this.getRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }));
  }

  agregarRespuestaPorDefecto(): void {
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(index: number): void {
    if (this.getRespuestas.length === 2) {
      this.toastr.error('Como minimo la pregunta debe contener 2 respuestas', 'Error!');
    }
    else {
      this.getRespuestas.removeAt(index);
    }
  }

  setRespuestaValida(index: number): void {
    this.respuestaCorrecta = index;
  }

  agregarPregunta(): void {
    //Obtenemos el titulo de la pregunta
    const descripcionPregunta = this.nuevaPregunta.get('titulo')!.value;

    //Obtenemos el array de respuestas
    const getArrayRespuestas = this.nuevaPregunta.get('respuestas')!.value;

    //Creamos un array de respuestas
    const arrayRespuestas: Respuesta[] = [];

    getArrayRespuestas.forEach((element: any, index: number) => {
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);
      if (index === this.respuestaCorrecta) {
        respuesta.esCorrecta = true;
      }
      arrayRespuestas.push(respuesta);
    });

    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRespuestas);
    
    this.enviarPregunta.emit(pregunta);

    //Limpiamos el formulario dinámico de preguntas y respuestas.
    this.reset();
  }

  reset(): void {
    this.respuestaCorrecta = 0;
    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestaPorDefecto();
  }
}

