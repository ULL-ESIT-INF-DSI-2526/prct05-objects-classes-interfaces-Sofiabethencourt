import {Animal} from "./ejercicio-PE-Animal";

/**
 * Tipo para solo admitir tres tipos de pelo
 */
export type Pelo = "Largo" | "Mediano" | "Corto";

/**
 * Clase Perro que hereda de Animal
 */
export class Perro extends Animal {
    /**
     * Constructor de Perro
     * @param id - Identificador
     * @param nombre - Nombre del Perro
     * @param edad - Edad
     * @param peso - Peso
     * @param salud - Estado de salud
     * @param raza - Raza del Perro
     * @param nivel_actividad - Nivel de actividad del 1-10
     * @param pelaje - Tipo de pelaje con Pelo
     */
    constructor(id: number, nombre: string, edad: number, 
                 peso: number, salud: string, public raza: string, 
                public nivel_actividad: number, public pelaje: Pelo ) {
        super(id, nombre, edad, peso, salud);
    }

    /**
     * 
     * @returns La ficha técnica del perro
     */
    public obtenerFicha(): string {
        const ficha: string = "Perro: " + this.id + ", " + this.nombre + ", " + this.edad + ", " + this.peso 
                            + ", " + this.salud + ", " + this.raza + ", " + this.nivel_actividad + ", " + this.pelaje + ".";
        return ficha;
    }
    
}