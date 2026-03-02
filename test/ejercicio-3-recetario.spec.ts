import {expect, describe, test, beforeEach} from 'vitest';
import {Receta} from '../src/ejercicio-3-recetario';

describe("Receta", () => {
    let receta1: Receta;
    let receta2: Receta;
    let receta3: Receta;
    let receta4: Receta;

    beforeEach(() => {
        receta1 = new Receta("Tortilla de patatas", 2020, []);
        receta2 = new Receta("Paella", 2018, []);
        receta3 = new Receta("Gazpacho", 2019, []);
        receta4 = new Receta("Ensalada", 2021, []);

        receta1.pasos.push({nombre: "Cortar patatas", duracion: 5, tags: ["cocina", "corte"], veces_completado: 10, paso_opcional: false});
        receta1.pasos.push({nombre: "Freír patatas", duracion: 10, tags: ["cocina", "fritura"], veces_completado: 5, paso_opcional: false});
        receta1.pasos.push({nombre: "Batir huevos", duracion: 3, tags: ["cocina", "batido"], veces_completado: 8, paso_opcional: true});

        receta2.pasos.push({nombre: "Cortar verduras", duracion: 7, tags: ["cocina"], veces_completado: 12, paso_opcional: false});
        receta2.pasos.push({nombre: "Cocer arroz", duracion: 15, tags: ["cocina"], veces_completado: 6, paso_opcional: false});
        receta2.pasos.push({nombre: "Añadir marisco", duracion: 5, tags: ["cocina"], veces_completado: 4, paso_opcional: true});

        receta3.pasos.push({nombre: "Cortar tomates", duracion: 4, tags: ["cocina", "corte"], veces_completado: 20, paso_opcional: true});
        receta3.pasos.push({nombre: "Mezclar ingredientes", duracion: 2, tags: ["cocina", "mezcla"], veces_completado: 15, paso_opcional: true});
        receta3.pasos.push({nombre: "Enfriar", duracion: 60, tags: ["cocina", "enfriamiento"], veces_completado: 10, paso_opcional: true});
    });

    test("debería crear una receta con las propiedades correctas", () => {
        expect(receta1.nombre).toBe("Tortilla de patatas");
        expect(receta1.fechaEstreno).toBe(2020);
        expect(receta1.pasos).toEqual([ {nombre: "Cortar patatas", duracion: 5, tags: ["cocina", "corte"], veces_completado: 10, paso_opcional: false},
        {nombre: "Freír patatas", duracion: 10, tags: ["cocina", "fritura"], veces_completado: 5, paso_opcional: false},
        {nombre: "Batir huevos", duracion: 3, tags: ["cocina", "batido"], veces_completado: 8, paso_opcional: true}]);
    });

    test("numPasos debería retornar el número correcto de pasos", () => {
        expect(receta1.numPasos()).toBe(3);
        receta1.pasos.push({nombre: "Cortar cebolla", duracion: 5, tags: ["cocina", "corte"], veces_completado: 10, paso_opcional: false});
        expect(receta1.numPasos()).toBe(4);
    });

    test("tiempoTotal debería retornar el tiempo mínimo y máximo correctamente", () => {    
        expect(receta1.tiempoTotal()).toEqual([15, 18]);
        receta1.pasos.push({nombre: "Cortar patatas", duracion: 5, tags: ["cocina", "corte"], veces_completado: 10, paso_opcional: false});
        receta1.pasos.push({nombre: "Freír patatas", duracion: 10, tags: ["cocina", "fritura"], veces_completado: 5, paso_opcional: false});
        receta1.pasos.push({nombre: "Batir huevos", duracion: 3, tags: ["cocina", "batido"], veces_completado: 8, paso_opcional: true});
        expect(receta1.tiempoTotal()).toEqual([30, 36]);
    });

    test("buscarPaso debería retornar los pasos que coincidan con el filtro", () => {
        let resultado = receta1.buscarPaso({nombre: "Cortar patatas"});
        expect(resultado).toEqual([{nombre: "Cortar patatas", duracion: 5, tags: ["cocina", "corte"], veces_completado: 10, paso_opcional: false}]);

        resultado = receta1.buscarPaso({duracion: 10});
        expect(resultado).toEqual([{nombre: "Freír patatas", duracion: 10, tags: ["cocina", "fritura"], veces_completado: 5, paso_opcional: false}]);

        resultado = receta1.buscarPaso({tag: "cocina"});
        expect(resultado).toEqual([ {nombre: "Cortar patatas", duracion: 5, tags: ["cocina", "corte"], veces_completado: 10, paso_opcional: false},
        {nombre: "Freír patatas", duracion: 10, tags: ["cocina", "fritura"], veces_completado: 5, paso_opcional: false},
        {nombre: "Batir huevos", duracion: 3, tags: ["cocina", "batido"], veces_completado: 8, paso_opcional: true}]);

        resultado = receta1.buscarPaso({veces_completado: 8});
        expect(resultado).toEqual([{nombre: "Batir huevos", duracion: 3, tags: ["cocina", "batido"], veces_completado: 8, paso_opcional: true}]);

        resultado = receta1.buscarPaso({opcional: true});
        expect(resultado).toEqual([{nombre: "Batir huevos", duracion: 3, tags: ["cocina", "batido"], veces_completado: 8, paso_opcional: true}]);
    });

    test("buscarPaso debería retornar un array vacío si no hay coincidencias", () => {
        let resultado = receta1.buscarPaso({nombre: "Cortar tomates"});
        expect(resultado).toEqual([]);
    });

    test ("buscarPaso debería retornar todos los pasos si el filtro está vacío", () => {
        let resultado = receta1.buscarPaso({});
        expect(resultado).toEqual([ {nombre: "Cortar patatas", duracion: 5, tags: ["cocina", "corte"], veces_completado: 10, paso_opcional: false},
        {nombre: "Freír patatas", duracion: 10, tags: ["cocina", "fritura"], veces_completado: 5, paso_opcional: false},
        {nombre: "Batir huevos", duracion: 3, tags: ["cocina", "batido"], veces_completado: 8, paso_opcional: true}]);
    });

    test ("buscarPaso debería retornar un array vacío si todos son opcionales y buscamos no opcionales", () => {
        let resultado = receta3.buscarPaso({opcional: false});
        expect(resultado).toEqual([]);
    });

    test ("buscarPaso debería retornar un array vacio si la etiqueta no coincide con ningún paso", () => {
        let resultado = receta1.buscarPaso({tag: "horno"});
        expect(resultado).toEqual([]);
    });

});