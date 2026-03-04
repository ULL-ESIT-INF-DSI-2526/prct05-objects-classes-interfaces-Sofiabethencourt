import {Perro, Pelo} from "./ejercicio-PE";
import {Animal} from "./ejercicio-PE-Animal";
import {Gato} from "./ejercicio-PE-Gato";

export type Ingreso = [ Animal, Date];

/**
 * Clase ingreso que guarda Animales
 */
export class Refugio {
    public animales: Ingreso [] = [];
    public limite_gatos = 20;
    public limite_perros = 30;

    /**
     * Constructor
     */
    constructor() {};

    /**
     * Función que añade animales al refugio con fecha de llegada
     * @param animal - Animal que añade
     * @param fecha - Fecha de llegada
     * @returns String de si se ha podido añadir o no
     */
    public añadirAnimal(animal: Animal, fecha: Date): string {
        const ingreso: Ingreso = [animal, fecha];
        if (ingreso[0] instanceof Gato && this.plazasGatosDisponibles() < 0) return "Ingreso fallido";
        if (ingreso[0] instanceof Perro && this.plazasPerrosDisponibles() < 0) return "Ingreso fallido";
        this.animales.push(ingreso);
        return "Ingreso correcto";
    }

    /**
     * Función que saca animales del refugio
     * @param animal - Animal que se sacará
     * @returns Si se ha podido sacar
     */
    public sacarAnimal(animal: Animal): string {
        this.animales = this.animales.filter (a => {
            if (a[0] == animal) return false;
            return true;
        });
        return "Salida correcta";
    }

    /**
     * Función que calcula la cantidad de plazas para gatos disponibles
     * @returns La cantidad de plazas para gatos libres
     */
    public plazasGatosDisponibles(): number {
        if (this.animales.length == 0) return this.limite_gatos;
        let n_gatos: Ingreso[] = this.animales.filter(a => {
            if ( a[0] instanceof Perro ) return false;
            return true;
        });

        return this.limite_gatos - n_gatos.length;
    }

    /**
     * Función que calcula la cantidad de plazas para perros disponibles
     * @returns La cantidad de plazas libres
     */
    public plazasPerrosDisponibles(): number {
        if (this.animales.length == 0) return this.limite_perros;
        let n_perros: Ingreso[] = this.animales.filter(a => {
            if (a[0] instanceof Gato) return false;  
            return true;
        });

        return this.limite_gatos - n_perros.length;
    }

    /**
     * Función para listar los animales del refugio
     * @returns la lista de los animales
     */
    public listarAnimales(): string {
        const animales_founded: Animal[] = this.animales.map(a => a[0]);
        const animales_string: string[] = animales_founded.map(a => a.obtenerFicha());
        return animales_string.join("\n");
    }

    /**
     * Función que busca un animal en el refugio por su número de microchip, que es el id del animal. Si encuentra el animal, devuelve su ficha técnica, si no lo encuentra devuelve un mensaje indicando que no se ha encontrado el animal.
     * @param microchip - Número de microchip del animal a buscar
     * @returns El animal encontrado o un mensaje indicando que no se ha encontrado el animal.
     */
    public buscarAnimal(microchip: number): Animal {
        const animal_encontrado: Ingreso[] = this.animales.filter(a => {
            if(a[0].id == microchip) return true;
            return false;
        });

        const animal: Animal= animal_encontrado[0][0];
        return animal;
    }

    /**
     * Función que filtra los animales del refugio según un filtro que puede contener la edad, el peso, la raza o el tipo de pelaje.
     * @param filtro - Objeto que contiene los criterios de filtrado para encontrar animales en el refugio.
     * @returns Animal[] - La función devuelve un array de animales que coinciden con el filtro.
     */
    public filtrarAnimales(filtro: {edad?: number, peso?: number, raza?: string, pelaje?: Pelo}): Ingreso[] {
       const animal_encontrado: Ingreso[] = this.animales.filter(a => {
            if(filtro.edad &&  filtro.edad!= a[0].edad) return false;
            if(filtro.peso &&  filtro.peso!= a[0].peso) return false;
            if(filtro.raza &&  a[0] instanceof Perro && filtro.raza!= a[0].raza) return false;
            if(filtro.pelaje &&  a[0] instanceof Perro && filtro.pelaje!= a[0].pelaje) return false;
            return false;
        });

        return animal_encontrado;
    }
}