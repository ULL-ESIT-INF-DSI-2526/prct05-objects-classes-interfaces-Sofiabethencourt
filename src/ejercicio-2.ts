export class Conecta4 {
    public jugador1: number = 1;
    public jugador2: number = 2;
    public tabla: number[][];

    constructor() {}


    public comenzarJuego(): void { 
        this.tabla = [];
        let jugador_actual = this.jugador1;

        this.inicializarTablero();
        let i: number = 1;

        while (i <= 42) {
            let columna: number = this.obtenerColumnaAleatoria();
            while (!this.columnaValida(columna)) {
                console.log(`Columna ${columna} llena, elige otra columna.`);
                columna = this.obtenerColumnaAleatoria();
            }
            let fila: number = this.colocarFicha(columna, jugador_actual);
            console.log(this.mostrarTablero());
            if (this.comprobarVictoria(fila, columna, jugador_actual)) {
                console.log(`¡Jugador ${jugador_actual} ha ganado!`);
                break;
            }
            jugador_actual = this.cambiarTurno(jugador_actual);
            if (this.tableroLleno()) {
                console.log("¡Empate! El tablero está lleno.");
                break;
            }
            i++;
        }
    }

    public inicializarTablero(): void {
        this.tabla = new Array(6);
        for (let i: number = 0; i < 6; i++) {
            this.tabla[i] = new Array(7).fill(null);
        }
    }

    public cambiarTurno(jugadorActual: number): number {
        return (jugadorActual == this.jugador1) ? this.jugador2 : this.jugador1;
    }

    public obtenerColumnaAleatoria(): number {
        return Math.floor(Math.random() * 7);
    }

    public colocarFicha(columna: number, jugador: number): number {
        let fila: number = 0;
        for (let i: number = 5; i >= 0; i--) {
            if (this.tabla[i][columna] == null) {
                fila = i;
                this.tabla[i][columna] = jugador;
                break;
            }
        }
        return fila;
    }

    public columnaValida(columna: number): boolean {
        return (this.tabla[0][columna] != null)? false: true;
    }

    public tableroLleno(): boolean {
        return (this.tabla.some(f => f.some(c => c == null)))? false : true;
    }

    public mostrarTablero(): string {
        let tablero: string = "";
        this.tabla.forEach(fila => {
            fila.forEach(c => {
                switch(c) {
                    case 1: 
                        tablero += "X ";
                        break;
                    case 2:
                        tablero += "O ";
                        break;
                    default:
                        tablero += ". ";
                        break;
                }
            });
            tablero += "\n";

        });
        return tablero;
    }

    public comprobarVictoria(fila: number, columna: number, jugador: number): boolean {
        let contador: number;
        let secuencia: number[];

        // Horizontal
        secuencia = this.tabla[fila];
        contador = 0;
        if (secuencia.some(f => {
            if (f === jugador) { contador++; return contador >= 4 } 
            else { contador = 0; return false }
        })) return true;

        // Vertical
        secuencia = this.tabla.map(r => r[columna]);
        contador = 0;
        if (secuencia.some(f => {
            if (f === jugador) { contador++; return contador >= 4 } 
            else { contador = 0; return false }
        })) return true;

        // Diagonal izquierda a derecha
        secuencia = this.tabla.map((r, i) => r[columna - fila + i]).filter(c => c != null);
        contador = 0;
        if (secuencia.some(f => {
            if (f === jugador) { contador++; return contador >= 4 } 
            else { contador = 0; return false }
        })) return true;

        // Diagonal derecha a izquierda
        secuencia = this.tabla.map((r, i) => r[columna + fila - i]).filter(c => c != null);
        contador = 0;
        if (secuencia.some(f => {
            if (f === jugador) { contador++; return contador >= 4 } 
            else { contador = 0; return false }
        })) return true;

        return false;
    }
}  
