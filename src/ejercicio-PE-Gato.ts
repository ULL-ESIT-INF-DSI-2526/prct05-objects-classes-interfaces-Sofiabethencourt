import {Animal} from "./ejercicio-PE-Animal"

/**
 * Tipo para solo admitir Exterior o Interior
 */
export type ExtInt = "Exterior" | "Interior";


/**
 * Clase Gato que hereda de animal
 */
export class Gato extends Animal {
    /**
     * Constructor de Gato
     * @param id - Identificador
     * @param nombre - Nombre del Gato
     * @param edad - Edad
     * @param peso - Peso
     * @param salud - Estado de salud
     * @param tipo - Exterior o interior
     */
    constructor(id: number, nombre: string, edad: number, 
                peso: number, salud: string, public tipo: ExtInt ) {
        super(id, nombre, edad, peso, salud);
    }

    /**
     * Función que haca una ficha técnica del Gato
     * @returns Un string con la ficha técnica
     */
    public obtenerFicha(): string {
        const ficha: string = "Gato: " + this.id + ", " + this.nombre + ", " + this.edad + ", " + this.peso 
                            + ", " + this.salud + ", " + this.tipo + ".";
        return ficha;
    }

}