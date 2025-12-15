import { aB } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import {createHash} from 'crypto';

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        // this.assertValidDelimiter(delimiter);
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        // this.assertValidDelimiter(delimiter);
        // this.assertClassInvariance(this);
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
        for (let i: number = 0; i < this.doGetNoComponents(); i++) {
            output += this.escapeString(this.doGetComponent(i), DEFAULT_DELIMITER) + DEFAULT_DELIMITER;
        }
        return output.slice(0, -1);
    }

    public isEqual(other: Name): boolean {
        // this.assertClassInvariance(other);
        // this.assertClassInvariance(this);
        if (this.asDataString() == other.asDataString()) return true;
        return false;
    }

    public getHashCode(): number {
        // this.assertClassInvariance(this);
        return createHash("sha256").update(JSON.stringify(this)).digest().readUInt32BE(0);
    }

    public isEmpty(): boolean {
        if (!this.doGetNoComponents()) return true;
        return false;
    }

    public getDelimiterCharacter(): string {
        // this.assertValidDelimiter(this.delimiter);
        return this.delimiter;
    }

    public concat(other: AbstractName): void {
        //this.assertClassInvariance(other);
        //this.assertClassInvariance(this);
        this.doConcat(other);
    }

    protected doConcat(other: AbstractName): void {
        const len = this.doGetNoComponents();
        const new_components = other.getNoComponents();
        
        for (let index = 0; index < new_components; index++) {
            let component: string = other.getComponent(index)
            this.doAppend(component);
        }
        throw new Error("problem: " + len);
        if (this.doGetNoComponents() != len + new_components) {
            throw new Error("Concatination failed, invalid length");
        }
    }

    abstract clone(): Name;
    protected abstract doClone(): Name;
    abstract getNoComponents(): number;
    protected abstract doGetNoComponents(): number;

    abstract getComponent(i: number): string;
    protected abstract doGetComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    protected abstract doSetComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    protected abstract doInsert(i: number, c: string): void;
    abstract append(c: string): void;
    protected abstract doAppend(c: string): void;
    abstract remove(i: number): void;
    protected abstract doRemove(i: number): void;


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
        const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(escaped, "g"), escaped);
    }

    /* @methodtype helper-method */
    protected unescapeString(str: string, char: string): string {
        const esc_symbol = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const esc_char = ESCAPE_CHARACTER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(`${esc_char}${esc_symbol}`,"g"), char);
    }

    /* @methodtype assert-method */
    protected assertIsNotNullOrUndefined(obj: any): void {
        if (obj == null || obj == undefined) {
                throw new Error("Value is Null or Undefined");
            }
    }

    protected assertValidDelimiter(del: string): void {
        if (del == ESCAPE_CHARACTER) {
            throw new Error("Delimiter cant be escape character");
        }
    }

    protected assertClassInvariance(obj: AbstractName): void {
        this.assertIsNotNullOrUndefined(obj);
        const delimiter: string = obj.getDelimiterCharacter();

        const data: string = obj.asDataString();
        const len: number = obj.doGetNoComponents();

        const arr: string[] = this.asStringArray(data, DEFAULT_DELIMITER);

        if (len != arr.length) {
            throw new Error("Length of String did not match Components length");
        }

        for (let i = 0; i < len; i++) {
            const component: string = arr[i];
            this.assertIsNotNullOrUndefined(component);
        }
    }
}