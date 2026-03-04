import {describe, expect, beforeEach, test} from 'vitest';
import {Perro} from '../src/ejercicio-PE.ts';
import {Refugio} from "../src/ejercicio-PE-Refugio.ts";
import {Animal} from "../src/ejercicio-PE-Animal.ts";
import {Gato} from "../src/ejercicio-PE-Gato.ts"


describe ('Perro' , () => {

    let perro: Perro;
    let perro2: Perro;

    beforeEach(() => {
        perro = new Perro(1, "Rafa", 12, 40, "Sano", "Labrador", 8, "Largo");
        perro2 = new Perro(2, "Samu", 5, 20, "Sano", "YorkShire", 3, "Corto");
    });

    test ("Perro debería ser una clase", () => {
            expect(typeof Perro).toBe("function");
    });

    test ("Se puede crear una instancia de Perro", () => {
            expect(perro).toBeInstanceOf(Perro);
    });

    test ("debería crear un perro con las propiedades correctas", () => {
        expect(perro.nombre).toBe("Rafa");
        expect(perro.id).toBe(1);
        expect(perro.edad).toEqual(12);
        expect(perro.peso).toBe(40);
        expect(perro.salud).toBe("Sano");
        expect(perro.raza).toBe("Labrador");
        expect(perro.nivel_actividad).toBe(8);
        expect(perro.pelaje).toBe("Largo");
    });

    test ("debería poder sacar una ficha correctamente de un Perro", () => {
        expect(perro.obtenerFicha()).toEqual("Perro: 1, Rafa, 12, 40, Sano, Labrador, 8, Largo.");
    });

    test ("deberia poder ponerle valor a los atributos", () => {
        expect(perro.nombre= "Paco").toBe("Paco");
        expect(perro.id = 3).toBe(3);
        expect(perro.edad = 4).toEqual(4);
        expect(perro.peso = 6).toBe(6);
        expect(perro.salud = "Insano").toBe("Insano");
        expect(perro.raza = "Bodeguero").toBe("Bodeguero");
        expect(perro.nivel_actividad = 9).toBe(9);
        expect(perro.pelaje = "Corto").toBe("Corto");
    });


});


describe ('Gato' , () => {

    let gato: Gato;
    let gato2: Gato;

    beforeEach(() => {
        gato = new Gato(3, "Sol", 2, 3, "Sano", "Interior");
        gato2 = new Gato(4, "Luna", 3, 10, "Sano", "Exterior");
    });

    test ("Gato debería ser una clase", () => {
            expect(typeof Gato).toBe("function");
    });

    test ("Se puede crear una instancia de Gato", () => {
            expect(gato).toBeInstanceOf(Gato);
    });

    test ("debería crear un gato con las propiedades correctas", () => {
        expect(gato.nombre).toBe("Sol");
        expect(gato.id).toBe(3);
        expect(gato.edad).toEqual(2);
        expect(gato.peso).toBe(3);
        expect(gato.salud).toBe("Sano");
        expect(gato.tipo).toBe("Interior");
    });

    test ("debería poder sacar una ficha correctamente de un Gato", () => {
        expect(gato.obtenerFicha()).toEqual("Gato: 3, Sol, 2, 3, Sano, Interior.");
    });

    test ("deberia poder ponerle valor a los atributos", () => {
        expect(gato.nombre= "Paco").toBe("Paco");
        expect(gato.id = 5).toBe(5);
        expect(gato.edad = 4).toEqual(4);
        expect(gato.peso = 6).toBe(6);
        expect(gato.salud = "Insano").toBe("Insano");
        expect(gato.tipo = "Exterior").toBe("Exterior");
    });

});

describe ("Refugio", () => {
    let refugio: Refugio;
    let perro: Perro;
    let gato: Gato;

    beforeEach(() => {
        refugio = new Refugio();        
        perro = new Perro(1, "Rafa", 12, 40, "Sano", "Labrador", 8, "Largo");
        gato = new Gato(2, "Sol", 2, 3, "Sano", "Interior");
    });

    test ("Refugio debería ser una clase", () => {
        expect(typeof Refugio).toBe("function");
    });

    test ("Se puede crear una instancia de Refugio", () => {
        expect(refugio).toBeInstanceOf(Refugio);
    });

    test ("debería poder ingresar un animal al refugio", () => {
        const fechaIngreso = new Date();
        refugio.añadirAnimal(perro, fechaIngreso);
        expect(refugio.animales.length).toBe(1);
        expect(refugio.animales[0][0]).toBe(perro);
        expect(refugio.animales[0][1]).toBe(fechaIngreso);
    });

     test ("debería poder retirar un animal del refugio", () => {
        const perro = new Perro(1, "Rafa", 12, 40, "Sano", "Labrador", 8, "Largo");
        const fechaIngreso = new Date();
        refugio.añadirAnimal(perro, fechaIngreso);
        refugio.sacarAnimal(perro);
        expect(refugio.animales.length).toBe(0);
    });

     test ("debería poder listar los animales en el refugio", () => {
        refugio.añadirAnimal(perro, new Date());
        refugio.añadirAnimal(gato, new Date());
        const listado = refugio.listarAnimales();
        expect(listado).toContain("Perro: 1, Rafa, 12, 40, Sano, Labrador, 8, Largo.");
        expect(listado).toContain("Gato: 2, Sol, 2, 3, Sano, Interior.");
    });

    test ("deberia poder encontrar un animal por sus caracteristicas", () => {
        refugio.añadirAnimal(perro, new Date());
        refugio.añadirAnimal(gato, new Date());
        const animalEncontrado = refugio.buscarAnimal(1);
        expect(animalEncontrado).toBe(perro);
    });

    test ("deberia ver las plazas disponibles para perros y gatos", () => {
        expect(refugio.plazasGatosDisponibles()).toBe(20);
        expect(refugio.plazasPerrosDisponibles()).toBe(30);
        refugio.añadirAnimal(perro, new Date());
        refugio.añadirAnimal(gato, new Date());
        expect(refugio.plazasGatosDisponibles()).toBe(19);
        expect(refugio.plazasPerrosDisponibles()).toBe(19);
    });

    test ("deberia no permitir ingresar un animal si no hay plazas disponibles", () => {
        for (let i = 0; i < 60; i++) {
            refugio.añadirAnimal(new Perro(i, `Perro${i}`, 2, 10, "Sano", "Raza", 5, "Corto"), new Date());
        }
        const resultado = refugio.añadirAnimal(perro, new Date());
        expect(resultado).toBe("Ingreso fallido");
    });

    test ("deberia no permitir ingresar un gato si no hay plazas disponibles", () => {
        for (let i = 0; i < 30; i++) {
            refugio.añadirAnimal(new Gato(i, `Gato${i}`, 2, 10, "Sano", "Exterior"), new Date());
        }
        const resultado = refugio.añadirAnimal(gato, new Date());
        expect(resultado).toBe("Ingreso fallido");
    });

    // test ("deberia filtrar por caracteristicas", () => {
    //     refugio.añadirAnimal(perro, new Date());
    //     refugio.añadirAnimal(gato, new Date());
    //     const resultado = refugio.filtrarAnimales({edad: 12});
    //     expect(resultado.length).toBe(1);
    //     expect(resultado[0]).toBe(perro);
    // });

})