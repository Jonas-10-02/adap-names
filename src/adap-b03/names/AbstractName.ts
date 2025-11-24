import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import {createHash} from 'crypto';

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public clone(): Name {
       return this;
    }

    public asString(delimiter: string = this.delimiter): string {
        let output: string = "";
        for (let i: number = 0; i < this.getNoComponents(); i++) {
            output += this.getComponent(i) + delimiter;
        }
        return output.slice(0, -1);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let output: string = "";
        for (let i: number = 0; i < this.getNoComponents(); i++) {
            output += this.escapeString(this.getComponent(i), DEFAULT_DELIMITER) + DEFAULT_DELIMITER;
        }
        return output.slice(0, -1);
    }

    public isEqual(other: Name): boolean {
        this.assertIsNotNullOrUndefined(other);
        if (this.asDataString() == other.asDataString()) return true;
        return false;
    }

    public getHashCode(): number {
        return createHash("sha256").update(JSON.stringify(this)).digest().readUInt32BE(0);
    }

    public isEmpty(): boolean {
        if (!this.getNoComponents()) return true;
        return false;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }


    /* @methodtype conversion-method */
    protected asStringArray(str: string, delimiter: string): string[] {
        let string_array: string[] = [];
        let start_idx: number = 0;
        if (str == "") return string_array;

        const del = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const esc = ESCAPE_CHARACTER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // find all non escaped delimiters
        const regex : RegExp = RegExp(`(?<!${esc})${del}`, 'g');
        let result : RegExpStringIterator<RegExpExecArray> = str.matchAll(regex);

        // split array at the found delimiters
        for( let entry of result) {
            string_array.push(str.slice(start_idx,entry.index));
            start_idx = entry.index + 1;
        }

        string_array.push(str.slice(start_idx, str.length));             
        return string_array;
    }

    /* @methodtype helper-method */
    protected escapeString(str: string, char: string): string {
        this.assertIsNotNullOrUndefined(str);
        this.assertIsNotNullOrUndefined(char);
        const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(escaped, "g"), escaped);
    }

    /* @methodtype helper-method */
    protected unescapeString(str: string, char: string): string {
        this.assertIsNotNullOrUndefined(str);
        this.assertIsNotNullOrUndefined(char);
        const esc_symbol = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const esc_char = ESCAPE_CHARACTER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(`${esc_char}${esc_symbol}`,"g"), char);
    }

    /* @methodtype assert-method */
    protected assertIdxInsideBounds(idx: number): void {
        if (idx > this.getNoComponents()) {
            throw new Error("Index out of bounds");
        }
    }

    /* @methodtype assert-method */
    protected assertIsNotNullOrUndefined(obj: any): void {
        if (obj == null || obj == undefined) throw new Error("Value is Null or Undefined");
        return;
    }


}