import {expect, describe, test, beforeEach, vi} from 'vitest';
import {SistemaRecetario} from '../src/ejercicio-3';
import {Chef} from '../src/ejercicio-3-chef';
import {Receta} from '../src/ejercicio-3-recetario';
import {Paso} from '../src/ejercicio-3-pasos';


describe("SistemaRecetario", () => {
    let sistema: SistemaRecetario;
    let chef1: Chef;
    let chef2: Chef;
    let chef3: Chef;
    let receta1: Receta;
    let receta2: Receta;
    let paso1: Paso;
    let paso2: Paso;

    beforeEach(() => {
        sistema = new SistemaRecetario([]);
        chef1 = new Chef("Gordon Ramsay", 1000000, []);
        chef2 = new Chef("Jamie Oliver", 500000, []);
        chef3 = new Chef("Nigella Lawson", 300000, []);
        receta1 = new Receta("Tortilla de patatas", 2020, []);
        receta2 = new Receta("Paella", 2018, []);

        paso1 = new Paso("Pelar las patatas", 10, ["pelar", "patatas"], 20, true);
        paso2 = new Paso("Cortar cebolla", 5, ["cocina", "verduras"], 10, false);

        receta1.pasos.push(paso1, paso2);
        chef1.recetario.push(receta1);
        chef2.recetario.push(receta2);

        sistema.agregarChef(chef1);
        sistema.agregarChef(chef2);
    });
    
    test("debería agregar chefs correctamente", () => {
        expect(sistema.buscarChef({nombre: "Gordon Ramsay"})).toEqual([chef1]);
        expect(sistema.buscarChef({nombre: "Jamie Oliver"})).toEqual([chef2]);
    });

    test("debería buscar chefs por nombre, seguidores y receta", () => {
        expect(sistema.buscarChef({nombre: "Gordon Ramsay"})).toEqual([chef1]);
        expect(sistema.buscarChef({seguidores: 500000})).toEqual([chef2]);
        expect(sistema.buscarChef({receta: receta1})).toEqual([chef1]);
    });

    test("debería mostrar la tabla correctamente", () => {
        const sistema = new SistemaRecetario([chef3]);

        const receta = new Receta("Tarta", 2023, [
            new Paso("Hornear", 1800, ["horno"], 2, false)
        ]);

        chef3.recetario.push(receta);

        const resultado = sistema.obtenerTabla();

        expect(resultado).toEqual([
            {
                chef: "Nigella Lawson",
                receta: "Tarta",
                anyo: 2023,
                pasos_totales: 1,
                tiempo_min: 1800,
                tiempo_max: 1800,
                paso: "Hornear",
                duracion: 1800,
                etiquetas: "horno"
            }
        ]);
    });

    test ("mostrarTabla debería imprimir la tabla en consola", () => {
        console.table = vi.fn();
        sistema.mostrarTabla();
        expect(console.table).toHaveBeenCalled();
    });
    
});