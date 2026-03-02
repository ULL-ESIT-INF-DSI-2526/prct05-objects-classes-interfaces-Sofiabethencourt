import {Elementos, ElementosBibliograficos, Revista, TFG, TFM} from "./ejercicio-1-elementos";

export class Inventario {
    public elementos_bibliograficos: ElementosBibliograficos[];

    constructor() {}

    public insertInventary(elemento: ElementosBibliograficos): void {
        this.elementos_bibliograficos.push(elemento);
    }
    
    public filtrarinventario(filtro: {tittle?: string, keywords?: string, author?: string, publishDate?: Date, editorial?: string} ): ElementosBibliograficos[] {
        let new_inventario: ElementosBibliograficos[] = this.elementos_bibliograficos;

        new_inventario = new_inventario.filter( elemento => {
            if (filtro.tittle && elemento.titulo != filtro.tittle ) return false;
            if (filtro.keywords && !elemento.palabrasClave.includes(filtro.keywords)) return false; 
            if (filtro.author && !elemento.autor.includes(filtro.author)) return false;
            if (filtro.publishDate && elemento.fechaPublicacion.getTime() != filtro.publishDate.getTime()) return false;
            if (filtro.editorial && elemento.editorial != filtro.editorial) return false;
            return true;
        });

        return new_inventario;
    }
}