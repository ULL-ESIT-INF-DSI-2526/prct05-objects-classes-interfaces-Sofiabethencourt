/**
 * Interfaz que define la estructura de los elementos de un paso, incluyendo el nombre del paso, la duración, las etiquetas asociadas, 
 * el número de veces que se ha completado el paso y si el paso es opcional.
 */
export interface elementosPaso {
    nombre: string;
    duracion: number;
    tags: string[];
    veces_completado: number;
    paso_opcional?: boolean;
}

/**
 * Clase que representa un paso de una receta, que contiene un nombre, una duración, un array de etiquetas asociadas, el número de veces 
 * que se ha completado el paso y si el paso es opcional.
 */
export class Paso implements elementosPaso {
    /**
     * Constructor de la clase Paso, que inicializa las propiedades nombre, duracion, tags, veces_completado y paso_opcional con los 
     * valores proporcionados como argumentos.
     * @param nombre - Nombre del paso
     * @param duracion - Duración del paso en minutos
     * @param tags - Array de etiquetas asociadas al paso
     * @param veces_completado - Número de veces que se ha completado el paso
     * @param paso_opcional - Indica si el paso es opcional (true) o no (false), con un valor predeterminado de false si no se proporciona.
     */
    constructor(public nombre: string, public duracion: number, public tags: string[], public veces_completado: number, 
                public paso_opcional?: boolean ) {}
}