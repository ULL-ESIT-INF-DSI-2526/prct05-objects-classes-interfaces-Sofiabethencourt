/**
 * Clase abstracta Animal que contiene los atributos genericos de todos los animales del refugio
 * 
 */
export abstract class Animal {
    /**
     * Constructor de Animal
     * @param _id - Identificador
     * @param _nombre - Nombre 
     * @param _edad - Edad
     * @param _peso - Peso
     * @param _salud - Estado de salud
     */
    constructor(private _id: number, private _nombre: string, private _edad: number, 
                private _peso: number, private _salud: string ) {}
    
    public get id() { return this._id; }
    public get nombre() { return this._nombre; }
    public get edad () { return this._edad; }
    public get peso() { return this._peso; }
    public get salud() { return this._salud; }

    public set id(id) { this._id = id; }
    public set nombre(nombre) { this._nombre = nombre; }
    public set edad(edad) { this._edad = edad; }
    public set peso(peso) { this._peso = peso; }
    public set salud(salud) { this._salud = salud; }

    /**
     * Metodo abstracto para obteber la ficha técnica
     */
    public abstract obtenerFicha(): string;
}