import {describe, test, expect, beforeEach} from 'vitest';
import {Paso} from '../src/ejercicio-3-pasos';

describe("Paso", () => {
    let paso: Paso;

    beforeEach(() => {
        paso = new Paso("Cortar cebolla", 5, ["cocina", "verduras"], 10, false);
    });

    test("debería crear un paso con las propiedades correctas", () => {
        expect(paso.nombre).toBe("Cortar cebolla");
        expect(paso.duracion).toBe(5);
        expect(paso.tags).toEqual(["cocina", "verduras"]);
        expect(paso.veces_completado).toBe(10);
        expect(paso.paso_opcional).toBe(false);
    });

    test("debería permitir crear un paso sin la propiedad opcional", () => {
        const pasoOpcional = new Paso("Pelar patatas", 3, ["cocina", "verduras"], 5);
        expect(pasoOpcional.paso_opcional).toBeUndefined();
    });
});