import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
    }

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
}