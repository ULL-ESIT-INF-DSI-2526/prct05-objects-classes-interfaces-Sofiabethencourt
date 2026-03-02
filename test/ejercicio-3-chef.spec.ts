import {test, expect, describe, beforeEach} from "vitest";
import {Chef} from "../src/ejercicio-3-chef";
import {Receta} from "../src/ejercicio-3-recetario";

describe("Chef", () => {
    let chef: Chef;
    let receta1: Receta;
    let receta2: Receta;

    beforeEach(() => {
        receta1 = new Receta("Tortilla de patatas", 2020, []);
        receta2 = new Receta("Paella", 2018, []);
        chef = new Chef("Juan", 1000, [receta1, receta2]);
    });

    test ("Chef debería ser una clase", () => {
        expect(typeof Chef).toBe("function");
    });

    test ("Se puede crear una instancia de Chef", () => {
        expect(chef).toBeInstanceOf(Chef);
    });

    test ("debería crear un chef con las propiedades correctas", () => {
        expect(chef.nombre).toBe("Juan");
        expect(chef.seguidores).toBe(1000);
        expect(chef.recetario).toEqual([receta1, receta2]);
    });

    test ("interfaz elementosChef debería tener las propiedades correctas", () => {
        expect(chef).toHaveProperty("nombre");
        expect(chef).toHaveProperty("seguidores");
        expect(chef).toHaveProperty("recetario");
    });

    test ("buscarReceta por año", () => {
        const resultado = chef.buscarReceta({anyo: 2020});
        expect(resultado).toEqual([receta1]);
    });

    test ("buscarReceta por nombre", () => {
        const resultado = chef.buscarReceta({nombre: "Paella"});
        expect(resultado).toEqual([receta2]);
    });
});