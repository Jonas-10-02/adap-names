import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        this.assertIsNotNullOrUndefined(source);
        if (delimiter != null && delimiter != undefined) this.delimiter = delimiter;
        this.components = source;
    }

    /* @methodtype conversion-method */
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    /* @methodtype conversion-method */
    public asDataString(): string {
        return this.components.map(element => {
            element = this.escapeString(element,ESCAPE_CHARACTER);
            element = this.escapeString(element,DEFAULT_DELIMITER);
            return element;
        }).join(DEFAULT_DELIMITER);
    }

    /* @methodtype get-method */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /* @methodtype boolean-query-method */
    public isEmpty(): boolean {
        return (this.components.length == 0);
    }

    /* @methodtype get-method */
    public getNoComponents(): number {
        return this.components.length;
    }

    /* @methodtype get-method */
    public getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i);
        this.assertIdxInsideBounds(i);
        return this.components[i];
    }

    /* @methodtype set-method */
    public setComponent(i: number, c: string): void {
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNullOrUndefined(c);
        this.assertIdxInsideBounds(i);
        this.components[i] = c;
    }

    /* @methodtype set-method */
    public insert(i: number, c: string): void {
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNullOrUndefined(c);
        this.assertIdxInsideBounds(i);
        this.components.splice(i,0,c);
    }

    /* @methodtype set-method */
    public append(c: string): void {
        this.assertIsNotNullOrUndefined(c);
        this.components.push(c);
    }

    /* @methodtype set-method */
    public remove(i: number): void {
        this.assertIsNotNullOrUndefined(i);
        this.assertIdxInsideBounds(i);
        this.components.splice(i,1);
    }

    /* @methodtype set-method */
    public concat(other: Name): void {
        this.assertIsNotNullOrUndefined(other);
        let list: string[] = this.asStringArray(other.asDataString(), DEFAULT_DELIMITER);
        list = list.map((element) => {
            element = this.unescapeString(element, ESCAPE_CHARACTER);
            element = this.unescapeString(element, DEFAULT_DELIMITER);
            return element
        });
        this.components = this.components.concat(list);
    }

    /* @methodtype conversion-method */
    private asStringArray(str: string, delimiter: string): string[] {
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
    private escapeString(str: string, char: string): string {
        const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(escaped, "g"), escaped);
    }

    /* @methodtype helper-method */
    private unescapeString(str: string, char: string): string {
        const esc_symbol = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const esc_char = ESCAPE_CHARACTER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(`${esc_char}${esc_symbol}`,"g"), char);
    }

    /* @methodtype assert-method */
    private assertIdxInsideBounds(idx: number): void {
        if (idx >= this.components.length) {
            throw new Error("Index out of bounds");
        }
    }

    /* @methodtype assert-method */
    private assertIsNotNullOrUndefined(obj: any): void {
        if (obj == null || obj == undefined) throw new Error("Value is Null or Undefined");
        return;
    }

}