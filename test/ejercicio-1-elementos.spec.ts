import {expect, test, describe, beforeEach} from 'vitest';
import {Elementos, ElementosBibliograficos, Revista, TFG, TFM} from '../src/ejercicio-1-elementos';

describe('Elementos', () => {

    let libro: ElementosBibliograficos;
    let revista: Revista;
    let tfg: TFG;
    let tfm: TFM;

    beforeEach(() => {
        libro = new ElementosBibliograficos(
            "Clean Code",
            ["Robert C. Martin"],
            ["programacion", "software"],
            "Un libro sobre buenas prácticas",
            new Date(2008, 7, 1),
            450,
            "Prentice Hall"
        );

        revista = new Revista(
            "IEEE Transactions on Software Engineering",
            ["IEEE Computer Society"],
            ["software", "ingenieria"],
            "Una revista sobre ingeniería de software",
            new Date(2020, 0, 1),
            100,
            "IEEE Computer Society",
            1,
            46
        );

        tfg = new TFG(
            "Análisis de algoritmos de ordenación",
            ["Sofia Bethencourt"],
            ["algoritmos", "ordenacion"],
            "Un trabajo de fin de grado sobre algoritmos de ordenación",
            new Date(2023, 5, 1),
            60,
            "Universidad de La Laguna",
            "Dr. Juan Pérez",
            "Universidad de La Laguna"
        );

        tfm = new TFM(
            "Optimización de algoritmos de búsqueda",
            ["Sofia Bethencourt"],
            ["algoritmos", "busqueda", "optimizacion"],
            "Un trabajo de fin de máster sobre optimización de algoritmos de búsqueda",
            new Date(2024, 5, 1),
            80,
            "Universidad de La Laguna",
            "Dr. Juan Pérez",
            "Universidad de La Laguna",
            "Empresa XYZ"
        );
    });

    test('debería formatear en formato IEEE', () => {
        expect(libro.getIEEE()).toBe("Robert C. Martin, Clean Code. Prentice Hall, 2008.");
        expect(revista.getIEEE()).toBe("IEEE Computer Society, IEEE Transactions on Software Engineering. IEEE Computer Society, 2020. Número 1, Volumen 46.");
        expect(tfg.getIEEE()).toBe("Sofia Bethencourt, Análisis de algoritmos de ordenación. Universidad de La Laguna, 2023.Universidad: Universidad de La Laguna, Tutor: Dr. Juan Pérez.");
        expect(tfm.getIEEE()).toBe("Sofia Bethencourt, Optimización de algoritmos de búsqueda. Universidad de La Laguna, 2024.Universidad: Universidad de La Laguna, Tutor: Dr. Juan Pérez. Empresa colaboradora: Empresa XYZ.");
    });

    test ('debería funcionar correctamente la interfaz Elementos', () => {
        const elementos: Elementos = libro;
        expect(elementos.titulo).toBe("Clean Code");
        expect(elementos.autor).toEqual(["Robert C. Martin"]);
        expect(elementos.palabrasClave).toEqual(["programacion", "software"]);
        expect(elementos.resumen).toBe("Un libro sobre buenas prácticas");
        expect(elementos.fechaPublicacion).toEqual(new Date(2008, 7, 1));
        expect(elementos.paginas).toBe(450);
        expect(elementos.editorial).toBe("Prentice Hall");
    });

    test ('debería heredar correctamente las clases', () => {   
        expect(revista instanceof ElementosBibliograficos).toBe(true);
        expect(tfg instanceof ElementosBibliograficos).toBe(true);
        expect(tfm instanceof ElementosBibliograficos).toBe(true);
    });

    test ('deberia crear objetos de cada clase correctamente', () => {
        expect(libro).toBeInstanceOf(ElementosBibliograficos);
        expect(revista).toBeInstanceOf(Revista);
        expect(tfg).toBeInstanceOf(TFG);
        expect(tfm).toBeInstanceOf(TFM);
    });

});