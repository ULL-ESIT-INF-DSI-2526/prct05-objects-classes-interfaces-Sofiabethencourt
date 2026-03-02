import {Receta} from './ejercicio-3-recetario';
import { Paso } from './ejercicio-3-pasos';

/**
 * Interfaz que define la estructura de los elementos de un chef, incluyendo el nombre del chef, el número de seguidores y un array de recetas.
 */
export interface elementosChef {
    nombre: string;
    seguidores: number;
    recetario: Receta[];
}

/**
 * Clase que representa un chef, que contiene un nombre, un número de seguidores y un array de recetas que el chef ha creado.
 */
export class Chef implements elementosChef {
    /**
     * Constructor de la clase Chef, que inicializa las propiedades nombre, seguidores y recetario con los valores proporcionados como argumentos.
     * @param nombre - Nombre del chef
     * @param seguidores - Número de seguidores del chef
     * @param recetario - Array de recetas que el chef ha creado
     */
    constructor(public nombre: string, public seguidores: number, public recetario: Receta[]) {}

    /**
     * Función que busca recetas en el recetario del chef según un filtro proporcionado como argumento, que puede contener el nombre de la receta,
     * el año de estreno o un paso específico. 
     * @param filtro - Objeto que contiene los criterios de búsqueda para encontrar recetas en el recetario del chef, con propiedades opcionales nombre, anyo y pasos.
     * @returns La función devuelve un array de recetas que coinciden con el filtro.
     */
    public buscarReceta(filtro:{nombre?: string, anyo?: number, pasos?: Paso}): Receta[] {
        let resultado: Receta[] = [];
        resultado = this.recetario.filter( receta => {
            if (filtro.anyo && filtro.anyo != receta.fechaEstreno) return false;
            if (filtro.nombre && filtro.nombre != receta.nombre) return false;
            return true;
        });

        return resultado;
    }
}