import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";


export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";            // internal string format is data string format for consistent internal handling
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.assertIsNotNullOrUndefined(source);
        if(delimiter != null && delimiter != undefined) this.delimiter = delimiter;

        // initial conversion in data string format
        let tmp_array = this.asStringArray(source, this.delimiter);
        tmp_array = tmp_array.map((element) => this.getEscapedString(element,DEFAULT_DELIMITER));

        this.name = tmp_array.join(DEFAULT_DELIMITER);
        this.noComponents = tmp_array.length;
    }

    /* @methodtype conversion-method */
    public asString(delimiter: string = this.delimiter): string {
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        if (this.isEmpty()) return "";

        return array_list.map(element => {
            element = this.getUnescapedString(element, ESCAPE_CHARACTER);
            element = this.getUnescapedString(element, DEFAULT_DELIMITER);
            return element
        }).join(delimiter);
    }

    /* @methodtype conversion-method */
    public asDataString(): string {
        return this.name;
    }

    /* @methodtype get-method */
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    /* @methodtype boolean-query-method */
    public isEmpty(): boolean {
        if (this.noComponents == 0) {
            return true;
        }
        return false;
    }

    /* @methodtype get-method */
    public getNoComponents(): number {
        return this.noComponents;
    }

    /* @methodtype get-method */
    public getComponent(x: number): string {
        this.assertIsNotNullOrUndefined(x);
        this.assertIdxInsideBounds(x);
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        return array_list[x];
    }

    /* @methodtype set-method */
    public setComponent(n: number, c: string): void {
        this.assertIsNotNullOrUndefined(n);
        this.assertIsNotNullOrUndefined(c);
        this.assertIdxInsideBounds(n);
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        array_list[n] = c;
        this.name = array_list.join(this.delimiter);
    }

    /* @methodtype set-method */
    public insert(n: number, c: string): void {
        this.assertIsNotNullOrUndefined(n);
        this.assertIsNotNullOrUndefined(c);
        this.assertIdxInsideBounds(n);
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        array_list.splice(n,0,c);
        this.name = array_list.join(DEFAULT_DELIMITER);
        this.noComponents++;
    }

    /* @methodtype set-method */
    public append(c: string): void {
        this.assertIsNotNullOrUndefined(c);
        this.name = this.name + DEFAULT_DELIMITER + c;
        this.noComponents++;
    }

    /* @methodtype set-method */
    public remove(n: number): void {
        this.assertIsNotNullOrUndefined(n);
        this.assertIdxInsideBounds(n);
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        array_list.splice(n,1);
        this.name = array_list.join(DEFAULT_DELIMITER);
    }

    /* @methodtype set-method */
    public concat(other: Name): void {
        this.assertIsNotNullOrUndefined(other);
        if (this.noComponents == 0)
        {
            this.name = other.asDataString();
        } else {
            this.name = this.name + DEFAULT_DELIMITER + other.asDataString();
        }
        this.noComponents += other.getNoComponents();
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
    private getUnescapedString(str: string, char: string): string {
        const esc_symbol = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const esc_char = ESCAPE_CHARACTER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(`${esc_char}${esc_symbol}`,"g"), char);
    }

    /* @methodtype helper-method */
    private getEscapedString(str: string, char: string): string {
        const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(escaped, "g"), escaped);
    }

    /* @methodtype assert-method */
    private assertIdxInsideBounds(idx: number): void {
        if (idx >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
    }

    /* @methodtype assert-method */
    private assertIsNotNullOrUndefined(obj: any): void {
        if (obj == null || obj == undefined) throw new Error("Value is Null or Undefined");
        return;
    }

}