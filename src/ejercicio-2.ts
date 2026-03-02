/**
 * Clase que representa el juego de Conecta 4. El juego se desarrolla en un tablero de 6 filas y 7 columnas, donde dos jugadores alternan turnos para colocar sus fichas. El objetivo es ser el primero en conseguir una línea de cuatro fichas consecutivas, ya sea horizontal, vertical o diagonalmente. El juego termina cuando un jugador gana o cuando el tablero se llena sin que ningún jugador haya ganado, resultando en un empate.
 */
export class Conecta4 {
    // El jugador 1 se representa con el número 1
    public jugador1: number = 1;
    // El jugador 2 se representa con el número 2
    public jugador2: number = 2;
    // El tablero se representa como una matriz de 6 filas y 7 columnas, donde cada celda puede contener null (vacía), 1 (ficha del jugador 1) o 
    // 2 (ficha del jugador 2)
    public tabla: number[][];

    /**
     * Constructor de la clase Conecta4 que inicializa el tablero vacío y establece los jugadores. El juego comienza con el jugador 1.
     */
    constructor() {}

    /**
     * Función que inicia el juego de Conecta 4, permitiendo a los jugadores colocar sus fichas en el tablero de forma alterna hasta que uno 
     * de ellos gane o el tablero se llene.
     */
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

    /**
     * Función que inicializa el tablero de Conecta 4 como una matriz de 6 filas y 7 columnas, llenando cada celda con null para indicar que 
     * están vacías.
     */
    public inicializarTablero(): void {
        this.tabla = new Array(6);
        for (let i: number = 0; i < 6; i++) {
            this.tabla[i] = new Array(7).fill(null);
        }
    }

    /**
     * Función que cambia el turno del jugador actual al siguiente jugador. Si el jugador actual es el jugador 1, devuelve el jugador 2, y 
     * viceversa.
     * @param jugadorActual - El número que representa al jugador actual (1 o 2).
     * @returns El número del siguiente jugador.
     */
    public cambiarTurno(jugadorActual: number): number {
        return (jugadorActual == this.jugador1) ? this.jugador2 : this.jugador1;
    }

    /**
     * Función que genera un número aleatorio entre 0 y 6 para seleccionar una columna del tablero donde el jugador actual colocará su ficha. 
     * La función utiliza Math.random() para generar un número decimal aleatorio, lo multiplica por 7 (el número de columnas) y luego utiliza 
     * Math.floor() para redondear hacia abajo y obtener un número entero que representa la columna seleccionada.
     * @returns Un número entero entre 0 y 6 que representa la columna seleccionada.
     */
    public obtenerColumnaAleatoria(): number {
        return Math.floor(Math.random() * 7);
    }

    /**
     * Función que coloca la ficha del jugador actual en la columna seleccionada. La función recorre la columna desde la fila inferior (fila 5)
     * hacia arriba (fila 0) para encontrar la primera celda vacía (null) y colocar la ficha del jugador en esa posición. Devuelve el número de fila
     * donde se colocó la ficha.
     * @param columna - El número de columna donde se desea colocar la ficha del jugador actual.
     * @param jugador - El número que representa al jugador actual (1 o 2) cuya ficha se va a colocar en el tablero.
     * @returns El número de fila donde se colocó la ficha.
     */
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

    /**
     * Función que verifica si la columna seleccionada por el jugador actual es válida para colocar una ficha.
     * @param columna - El número de columna que se desea verificar para colocar una ficha del jugador actual.
     * @returns true si la columna es válida para colocar una ficha, false en caso contrario.
     */
    public columnaValida(columna: number): boolean {
        return (this.tabla[0][columna] != null)? false: true;
    }

    /**
     * Función que verifica si el tablero de Conecta 4 está lleno, es decir, si no hay celdas vacías (null) en ninguna de las filas del tablero.
     * @returns true si el tablero está lleno, false si aún hay celdas vacías disponibles para colocar fichas.
     */
    public tableroLleno(): boolean {
        return (this.tabla.some(f => f.some(c => c == null)))? false : true;
    }

    /**
     * Función que muestra el estado actual del tablero de Conecta 4 como una cadena de texto. La función recorre cada fila y cada celda del tablero,
     * representando las fichas de los jugadores con "X" para el jugador 1, "O" para el jugador 2 y "." para las celdas vacías. Cada fila se muestra en una
     * nueva línea para facilitar la visualización del tablero.
     * @returns El estado actual del tablero de Conecta 4 representado como una cadena de texto.
     */
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

    /**
     * Función que verifica si el jugador actual ha ganado el juego de Conecta 4 después de colocar su ficha en la posición especificada por fila 
     * y columna. La función comprueba si hay una secuencia de 4 fichas del mismo jugador en línea horizontal, vertical o diagonal.
     * @param fila - El número de fila donde el jugador actual colocó su ficha.
     * @param columna - El número de columna donde el jugador actual colocó su ficha.
     * @param jugador - El número que representa al jugador actual (1 o 2) que se desea verificar si ha ganado después de colocar su ficha.
     * @returns true si el jugador actual ha ganado, false en caso contrario.
     */
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
