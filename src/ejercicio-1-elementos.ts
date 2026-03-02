/**
 * Interfaz que define los elementos bibliográficos con sus propiedades.
 */
export interface Elementos {
    titulo: string;
    autor: string[];
    palabrasClave: string[];
    resumen: string;
    fechaPublicacion: Date;
    paginas: number;
    editorial: string;
}

/**
 * Clase que implementa la interfaz Elementos y representa un elemento bibliográfico.
 * Incluye un método para obtener la referencia en formato IEEE.
 */
export class ElementosBibliograficos implements Elementos {
    /**
     * Constructor de la clase ElementosBibliograficos que inicializa las propiedades del elemento bibliográfico.
     * @param titulo - Título del elemento bibliográfico.
     * @param autor - Lista de autores del elemento bibliográfico.
     * @param palabrasClave - Lista de palabras clave asociadas al elemento bibliográfico.
     * @param resumen - Resumen del contenido del elemento bibliográfico.
     * @param fechaPublicacion - Fecha de publicación del elemento bibliográfico.
     * @param paginas - Número de páginas del elemento bibliográfico.
     * @param editorial - Editorial que publicó el elemento bibliográfico.
     */
    constructor( public titulo: string, public autor: string[], public palabrasClave: string[], public resumen: string, public fechaPublicacion: Date, 
                 public paginas: number, public editorial: string) {}
    
    /**
     * Función que devuelve la referencia del elemento bibliográfico en formato IEEE.
     * @returns La referencia en formato IEEE.
     */
    public getIEEE(): string {
        let ieee_format: string = "";

        this.autor.forEach(a => {
            ieee_format += a + ", ";
        });

        ieee_format += this.titulo + ". " + this.editorial + ", " + this.fechaPublicacion.getFullYear() + ".";
        return ieee_format;
    }
}

/**
 * Clase que representa una revista, que es un tipo específico de elemento bibliográfico.
 */
export class Revista extends ElementosBibliograficos {
    /**
     * Constructor de la clase Revista que inicializa las propiedades del elemento bibliográfico y las específicas de la revista.
     * @param titulo - Título de la revista.
     * @param autor - Lista de autores de la revista.
     * @param palabrasClave - Lista de palabras clave asociadas a la revista.
     * @param resumen - Resumen del contenido de la revista.
     * @param fechaPublicacion - Fecha de publicación de la revista.
     * @param paginas - Número de páginas de la revista.
     * @param editorial - Editorial que publicó la revista.
     * @param numero_revista - Número de la revista.
     * @param volumen_asignado - Volumen asignado a la revista.
     */
    constructor( public titulo: string, public autor: string[], public palabrasClave: string[], public resumen: string, public fechaPublicacion: Date, 
                 public paginas: number, public editorial: string, public numero_revista: number, public volumen_asignado: number) {
        super(titulo, autor, palabrasClave, resumen, fechaPublicacion, paginas, editorial);
    }

    /**
     * Función que devuelve la referencia de la revista en formato IEEE, incluyendo el número de revista y el volumen asignado.
     * @returns La referencia de la revista en formato IEEE.
     */
    public getIEEE(): string {
        let ieee_format: string = super.getIEEE();
        ieee_format += " Número " + this.numero_revista + ", Volumen " + this.volumen_asignado + ".";
        return ieee_format;
    }   
}

/**
 * Clase que representa un Trabajo de Fin de Grado (TFG), que es un tipo específico de elemento bibliográfico.
 */
export class TFG extends ElementosBibliograficos {
    /**
     * Constructor de la clase TFG que inicializa las propiedades del elemento bibliográfico y las específicas del TFG.
     * @param titulo - Título del TFG.
     * @param autor - Lista de autores del TFG.
     * @param palabrasClave - Lista de palabras clave asociadas al TFG.
     * @param resumen - Resumen del contenido del TFG.
     * @param fechaPublicacion - Fecha de publicación del TFG.
     * @param paginas - Número de páginas del TFG.
     */
    constructor( public titulo: string, public autor: string[], public palabrasClave: string[], public resumen: string, public fechaPublicacion: Date, 
                 public paginas: number, public editorial: string, public tutor: string, public universidad: string) {
        super(titulo, autor, palabrasClave, resumen, fechaPublicacion, paginas, editorial);
    }

    /**
     * Función que devuelve la referencia del TFG en formato IEEE, incluyendo el tutor y la universidad.
     * @returns La referencia del TFG en formato IEEE.
     */
    public getIEEE(): string {
        let ieee_format: string = super.getIEEE();
        ieee_format += "Universidad: " + this.universidad + ", Tutor: " + this.tutor + ".";
        return ieee_format;
    }
}

/**
 * Clase que representa un Trabajo de Fin de Máster (TFM), que es un tipo específico de elemento bibliográfico.
 */
export class TFM extends TFG {
    /**
     * Constructor de la clase TFM que inicializa las propiedades del elemento bibliográfico y las específicas del TFM.
     * @param titulo - Título del TFM.
     * @param autor - Lista de autores del TFM.
     * @param palabrasClave - Lista de palabras clave asociadas al TFM.
     * @param resumen - Resumen del contenido del TFM.
     * @param fechaPublicacion - Fecha de publicación del TFM.
     * @param paginas - Número de páginas del TFM.
     * @param editorial - Editorial que publicó el TFM.
     * @param tutor - Tutor del TFM.
     * @param universidad - Universidad donde se realizó el TFM.
     * @param empresa_colaboradora - Empresa colaboradora en el TFM.
     */
    constructor( public titulo: string, public autor: string[], public palabrasClave: string[], public resumen: string, public fechaPublicacion: Date, 
                 public paginas: number, public editorial: string, public tutor: string, public universidad: string, public empresa_colaboradora: string) {
        super(titulo, autor, palabrasClave, resumen, fechaPublicacion, paginas, editorial, tutor, universidad);
    }

    /**
     * Función que devuelve la referencia del TFM en formato IEEE, incluyendo el tutor, la universidad y la empresa colaboradora.
     * @returns La referencia del TFM en formato IEEE.
     */
    public getIEEE(): string {
        let ieee_format: string = super.getIEEE();
        ieee_format += " Empresa colaboradora: " + this.empresa_colaboradora + ".";
        return ieee_format;
    }
}