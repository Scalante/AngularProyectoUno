import { Respuesta } from './respuesta'

export class Pregunta {
    descripcion: string;
    listRespuestas: Respuesta[];
    hide?: boolean;

    constructor(descripcion: string, listRespuestas: Respuesta[]) {
        this.descripcion = descripcion;
        this.listRespuestas = listRespuestas;
        this.hide = true;
    }
}