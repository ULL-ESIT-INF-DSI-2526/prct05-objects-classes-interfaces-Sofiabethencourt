import { Paso} from "./ejercicio-3-pasos";
import { Receta } from "./ejercicio-3-recetario";
import { Chef} from "./ejercicio-3-chef";

/**
 * Clase que representa un sistema de recetario, que contiene chefs y sus recetas.
 */
export class SistemaRecetario {
    // Propiedad privada que almacena los chefs del sistema
    private chefs: Chef[];

    /**
     * Constructor de la clase SistemaRecetario, que inicializa la propiedad chefs con un array de chefs proporcionado como argumento.
     * @param chefs - Array de chefs para inicializar el sistema de recetario
     */
    constructor(chefs: Chef[]) {
        this.chefs = chefs;
    }

    /**
     * Función que agrega un chef al sistema de recetario, añadiéndolo al array de chefs.
     * @param chef - Chef a agregar al sistema de recetario
     */
    public agregarChef(chef: Chef): void {
        this.chefs.push(chef);
    }

    /**
     * Función que busca chefs en el sistema de recetario según un filtro proporcionado como argumento, que puede contener el nombre del chef, 
     * el número de seguidores o una receta específica. La función devuelve un array de chefs que coinciden con el filtro.
     * @param filtro - Objeto que contiene los criterios de búsqueda para encontrar chefs en el sistema de recetario, con propiedades opcionales 
     * nombre, seguidores y receta.
     * 
     * @returns Un array de chefs que coinciden con el filtro proporcionado, o un array vacío si no se encuentran coincidencias.
     */
    public buscarChef(filtro: {nombre?: string, seguidores?: number, receta?: Receta}): Chef[] {
        let resultado: Chef[] = [];
        resultado = this.chefs.filter(c => {
            if (filtro.nombre && filtro.nombre != c.nombre) return false;
            if (filtro.seguidores && filtro.seguidores != c.seguidores) return false;
            if (filtro.receta && !c.recetario.includes(filtro.receta)) return false;
            return true;
        });
        return resultado;
    }

    /**
     * Función que obtiene una tabla con información detallada de cada paso de cada receta de cada chef en el sistema de recetario. 
     * La función devuelve un array de objetos, donde cada objeto representa un paso de una receta de un chef, con propiedades como el 
     * nombre del chef, el nombre de la receta, el año de estreno de la receta, el número total de pasos de la receta, el tiempo mínimo 
     * y máximo para completar la receta, el nombre del paso, la duración del paso y las etiquetas asociadas al paso.
     * @returns Un array de objetos que representan cada paso de cada receta de cada chef en el sistema de recetario, 
     * con información detallada sobre el chef, la receta y el paso.
     */
    public obtenerTabla(): any[] {
        return this.chefs.flatMap(c =>
            c.recetario.flatMap(r =>
                r.pasos.map(p => ({
                    chef: c.nombre,
                    receta: r.nombre,
                    anyo: r.fechaEstreno,
                    pasos_totales: r.numPasos(),
                    tiempo_min: r.tiempoTotal()[0],
                    tiempo_max: r.tiempoTotal()[1],
                    paso: p.nombre,
                    duracion: p.duracion,
                    etiquetas: p.tags.join(", ")
                }))
            )
        );
    }

    /**
     * Función que muestra la tabla obtenida por la función obtenerTabla en la consola utilizando console.table, para una visualización más 
     * clara y organizada de la información.
     */
    public mostrarTabla(): void {
        console.table(this.obtenerTabla());
    }

}