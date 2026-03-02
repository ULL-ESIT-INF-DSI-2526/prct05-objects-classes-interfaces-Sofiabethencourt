import {test, describe, beforeEach, expect} from 'vitest';
import {Elementos, ElementosBibliograficos, TFG, TFM, Revista} from '../src/ejercicio-1-elementos.ts';
import {Inventario} from '../src/ejercicio-1-inventario.ts';


describe('Inventario', () => {

    let inventario: Inventario;
    let libro: ElementosBibliograficos;
    let libro2: ElementosBibliograficos;

    beforeEach(() => {
        inventario = new Inventario();
        inventario.elementos_bibliograficos = [];

        libro = new ElementosBibliograficos(
            "Clean Code",
            ["Robert C. Martin"],
            ["programacion", "software"],
            "Un libro sobre buenas prácticas",
            new Date(2008, 7, 1),
            450,
            "Prentice Hall"
        );

        libro2 = new ElementosBibliograficos(
            "The Pragmatic Programmer",
            ["Andrew Hunt", "David Thomas"],
            ["programacion", "software"],
            "Un libro sobre desarrollo de software pragmático",
            new Date(1999, 9, 30),
            352,
            "Addison-Wesley"
        );
    });

    test('debería insertar un elemento en el inventario', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        expect(inventario.elementos_bibliograficos.length).toBe(2);
        expect(inventario.elementos_bibliograficos[0]).toBe(libro);
        expect(inventario.elementos_bibliograficos[1]).toBe(libro2);
    });

    test('debería filtrar por título', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({ tittle: "Clean Code" });

        expect(resultado.length).toBe(1);
        expect(resultado[0].titulo).toBe("Clean Code");
    });

    test('debería filtrar por editorial', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({ editorial: "Prentice Hall" });

        expect(resultado.length).toBe(1);
        expect(resultado[0].editorial).toBe("Prentice Hall");
    });

    test('debería filtrar por fecha', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({ publishDate: new Date(2008, 7, 1) });

        expect(resultado.length).toBe(1);
        expect(resultado[0].fechaPublicacion).toEqual(new Date(2008, 7, 1));
    });

    test('debería filtrar por palabras clave', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({ keywords: "programacion" });

        expect(resultado.length).toBe(2);
        expect(resultado[0].palabrasClave).toContain("programacion");
        expect(resultado[1].palabrasClave).toContain("programacion");
    });

    test('debería filtrar por palabras clave', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({ keywords: "hola" });

        expect(resultado.length).toBe(0);
    });

    test('debería filtrar por autor', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({ author: "Robert C. Martin" });

        expect(resultado.length).toBe(1);
        expect(resultado[0].autor).toContain("Robert C. Martin");
    });

    test ('debería filtrar por múltiples criterios', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({ tittle: "Clean Code", editorial: "Prentice Hall" });

        expect(resultado.length).toBe(1);
        expect(resultado[0].titulo).toBe("Clean Code");
        expect(resultado[0].editorial).toBe("Prentice Hall");
    });

    test ('debería retornar un array vacío si no hay coincidencias', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({ tittle: "Nonexistent Book" });

        expect(resultado.length).toBe(0);
    });

    test ('debería retornar todos los elementos si no se especifica ningún filtro', () => {
        inventario.insertInventary(libro);
        inventario.insertInventary(libro2);

        const resultado = inventario.filtrarinventario({});

        expect(resultado.length).toBe(2);
        expect(resultado[0]).toBe(libro);
        expect(resultado[1]).toBe(libro2);
    });

});