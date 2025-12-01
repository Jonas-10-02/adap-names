import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
        this.assertClassInvariance(this);
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
        this.assertClassInvariance(this);
    }

    /* @methodtype set-method */
    public insert(i: number, c: string): void {
        this.assertIsNotNullOrUndefined(i);
        this.assertIsNotNullOrUndefined(c);
        this.assertIdxInsideBounds(i);
        this.components.splice(i,0,c);
        this.assertClassInvariance(this);
    }

    /* @methodtype set-method */
    public append(c: string): void {
        this.assertIsNotNullOrUndefined(c);
        this.components.push(c);
        this.assertClassInvariance(this);
    }

    /* @methodtype set-method */
    public remove(i: number): void {
        this.assertIsNotNullOrUndefined(i);
        this.assertIdxInsideBounds(i);
        this.components.splice(i,1);
        this.assertClassInvariance(this);
    }

    /* @methodtype assert-method */
    public assertIdxInsideBounds(idx: number): void {
        if (idx < 0 || idx > this.components.length) {
            throw new Error("Index out of bounds");
        }
    }
}