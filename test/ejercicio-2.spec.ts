import { describe, it, expect, beforeEach } from 'vitest';
import { Conecta4 } from '../src/ejercicio-2';

describe('Conecta4', () => {
    let juego: Conecta4;

    beforeEach(() => {
        juego = new Conecta4();
        juego.inicializarTablero();
    });

    it('debería inicializar un tablero vacío 6x7', () => {
        expect(juego.tabla.length).toBe(6);
        expect(juego.tabla[0].length).toBe(7);
        expect(juego.tabla.flat().every(c => c === null)).toBe(true);
    });

    it('debería colocar ficha correctamente en columna', () => {
        const fila = juego.colocarFicha(3, juego.jugador1);
        expect(juego.tabla[fila][3]).toBe(juego.jugador1);
    });

    it('debería cambiar turno correctamente', () => {
        expect(juego.cambiarTurno(juego.jugador1)).toBe(juego.jugador2);
        expect(juego.cambiarTurno(juego.jugador2)).toBe(juego.jugador1);
    });

    it('debería validar columna correctamente', () => {
        // columna vacía → válida
        expect(juego.columnaValida(0)).toBe(true);

        // llenar columna
        for (let i = 0; i < 6; i++) {
            juego.colocarFicha(0, juego.jugador1);
        }
        expect(juego.columnaValida(0)).toBe(false);
    });

    it('debería detectar tablero lleno', () => {
        expect(juego.tableroLleno()).toBe(false);
        // llenar todo el tablero
        for (let c = 0; c < 7; c++) {
            for (let r = 0; r < 6; r++) {
                juego.colocarFicha(c, juego.jugador1);
            }
        }
        expect(juego.tableroLleno()).toBe(true);
    });

    it('debería mostrar tablero como string', () => {
        juego.colocarFicha(0, juego.jugador1);
        const str = juego.mostrarTablero();
        expect(str.includes('X')).toBe(true);
        expect(str.includes('O')).toBe(false);
        expect(str.includes('.')).toBe(true);
    });

    it('debería detectar victoria horizontal', () => {
        for (let c = 0; c < 4; c++) {
            juego.colocarFicha(c, juego.jugador1);
        }
        expect(juego.comprobarVictoria(5, 3, juego.jugador1)).toBe(true);
    });

    it('debería detectar victoria vertical', () => {
        for (let i = 0; i < 4; i++) {
            juego.colocarFicha(0, juego.jugador1);
        }
        expect(juego.comprobarVictoria(2, 0, juego.jugador1)).toBe(true);
    });

    it('debería detectar victoria diagonal ↘', () => {
        // construimos diagonal desde (2,0) → (5,3)
        juego.colocarFicha(0, juego.jugador1); // fila5
        juego.colocarFicha(1, juego.jugador2);
        juego.colocarFicha(1, juego.jugador1); // fila5
        juego.colocarFicha(2, juego.jugador2);
        juego.colocarFicha(2, juego.jugador2);
        juego.colocarFicha(2, juego.jugador1); // fila5
        juego.colocarFicha(3, juego.jugador2);
        juego.colocarFicha(3, juego.jugador2);
        juego.colocarFicha(3, juego.jugador2);
        const fila = juego.colocarFicha(3, juego.jugador1); // fila2
        expect(juego.comprobarVictoria(fila, 3, juego.jugador1)).toBe(true);
    });

    it('debería detectar victoria diagonal ↙', () => {
        // construimos diagonal desde (2,3) → (5,0)
        juego.colocarFicha(3, juego.jugador1); // fila5
        juego.colocarFicha(2, juego.jugador2);
        juego.colocarFicha(2, juego.jugador1); // fila5
        juego.colocarFicha(1, juego.jugador2);
        juego.colocarFicha(1, juego.jugador2);
        juego.colocarFicha(1, juego.jugador1); // fila5
        juego.colocarFicha(0, juego.jugador2);
        juego.colocarFicha(0, juego.jugador2);
        juego.colocarFicha(0, juego.jugador2);
        const fila = juego.colocarFicha(0, juego.jugador1); // fila2
        expect(juego.comprobarVictoria(fila, 0, juego.jugador1)).toBe(true);
    });

    it('debería obtener columna aleatoria válida', () => {
        const col = juego.obtenerColumnaAleatoria();
        expect(col).toBeGreaterThanOrEqual(0);
        expect(col).toBeLessThan(7);
    });

    it ('deberia ejecutar una partida completa sin errores', () => {
        const juego = new Conecta4();
        juego.comenzarJuego();

        // Al final, debe haber un ganador o empate
        const victoria = juego.tabla.some((fila, r) =>
            fila.some((_, c) =>
                juego.comprobarVictoria(r, c, juego.jugador1) ||
                juego.comprobarVictoria(r, c, juego.jugador2)
            )
        );
        const empate = juego.tableroLleno();

        expect(victoria || empate).toBe(true);
    });

    it ('columnaValida debería retornar false si la columna está llena', () => {
        for (let i = 0; i < 6; i++) {
            juego.colocarFicha(0, juego.jugador1);
        }
        expect(juego.columnaValida(0)).toBe(false);
    });

    it('comprobarVictoria retorna false si no hay victoria', () => {
        juego.colocarFicha(0, juego.jugador1);
        juego.colocarFicha(1, juego.jugador2);
        expect(juego.comprobarVictoria(5, 0, juego.jugador1)).toBe(false);
    });

    it('comprobarVictoria cubre diagonales fuera de rango', () => {
        juego.colocarFicha(0, juego.jugador1);
        juego.colocarFicha(1, juego.jugador2);
        juego.colocarFicha(2, juego.jugador1);
        expect(juego.comprobarVictoria(5, 0, juego.jugador1)).toBe(false);
    });


});