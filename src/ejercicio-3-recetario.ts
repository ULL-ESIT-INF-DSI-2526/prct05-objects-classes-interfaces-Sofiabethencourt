import {Paso} from './ejercicio-3-pasos';

/**
 * Interfaz que define la estructura de los elementos de una receta, incluyendo el nombre de la receta, el año de estreno y un array de pasos.
 */
export interface elementosRecetario {
    nombre: string;
    fechaEstreno: number, 
    pasos: Paso[];
}

/**
 * Clase que representa una receta, que contiene un nombre, un año de estreno y un array de pasos que componen la receta.
 */
export class Receta implements elementosRecetario {
    /**
     * Constructor de la clase Receta, que inicializa las propiedades nombre, fechaEstreno y pasos con los valores proporcionados como argumentos.
     * @param nombre - Nombre de la receta
     * @param fechaEstreno - Año de estreno de la receta
     * @param pasos - Array de pasos que componen la receta
     */
    constructor(public nombre: string, public fechaEstreno: number, public pasos: Paso[]){}

    /**
     * Función que devuelve el número total de pasos de la receta, contando tanto los pasos obligatorios como los opcionales.
     * @returns El número total de pasos de la receta.
     */
    public numPasos(): number {
        return this.pasos.length;
    }

    /**
     * Función que calcula el tiempo total mínimo y máximo para completar la receta, sumando la duración de cada paso. 
     * El tiempo mínimo se calcula considerando solo los pasos obligatorios, mientras que el tiempo máximo incluye todos los pasos.
     * @returns Un array con dos elementos: el tiempo mínimo y el tiempo máximo para completar la receta.
     */
    public tiempoTotal(): number[] {
        let dur_min: number = 0;
        let dur_max: number = 0;
        this.pasos.forEach(p => {
            dur_max += p.duracion;
            if (p.paso_opcional == false) {
                dur_min += p.duracion;
            }
        });

        return [dur_min, dur_max];
    }

    /**
     * Función que busca pasos en la receta según un filtro proporcionado como argumento, que puede contener el nombre del paso, 
     * la duración, una etiqueta, el número de veces que se ha completado el paso o si el paso es opcional.
     * @param filtro - Objeto que contiene los criterios de búsqueda para encontrar pasos en la receta.
     * @returns  La función devuelve un array de pasos que coinciden con el filtro.
     */
    public buscarPaso(filtro: {nombre?: string, duracion?: number, tag?: string, veces_completado?: number, opcional?: boolean}): Paso[] {
        let resultado: Paso[] = [];
        resultado = this.pasos.filter(paso => {
            if (filtro.nombre && filtro.nombre != paso.nombre) return false;
            if (filtro.duracion && filtro.duracion != paso.duracion) return false;
            if (filtro.tag && !paso.tags.includes(filtro.tag)) return false;
            if (filtro.veces_completado && filtro.veces_completado != paso.veces_completado) return false;
            if (filtro.opcional != undefined && filtro.opcional != paso.paso_opcional) return false;
            return true;
        });
        return resultado;
    }

}