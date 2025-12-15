import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = source;
        // this.assertClassInvariance(this);
    }

    public clone(): Name {
        return this.doClone();
    }

    protected doClone(): Name {
        let deepCopy: Name = new StringArrayName([], this.delimiter);
        deepCopy.concat(this);
        return deepCopy;
    }

    public getNoComponents(): number {
        return this.doGetNoComponents();
    }

    protected doGetNoComponents(): number {
        return this.components.length;
    }

   /* @methodtype get-method */
    public getComponent(i: number): string {
        // this.assertIsNotNullOrUndefined(i);
        // this.assertIdxInsideBounds(i);
        return this.doGetComponent(i);
    }

    protected doGetComponent(i: number): string {
        return this.components[i];
    }

    /* @methodtype set-method */
    public setComponent(i: number, c: string): void {
        // this.assertIsNotNullOrUndefined(i);
        // this.assertIsNotNullOrUndefined(c);
        // this.assertIdxInsideBounds(i);
        this.doSetComponent(i,c);
        // this.assertClassInvariance(this);
    }

    protected doSetComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    /* @methodtype set-method */
    public insert(i: number, c: string): void {
        // this.assertIsNotNullOrUndefined(i);
        // this.assertIsNotNullOrUndefined(c);
        // this.assertIdxInsideBounds(i);
        this.doInsert(i,c);
        // this.assertClassInvariance(this);
    }

    protected doInsert(i: number, c: string): void {
        this.components.splice(i,0,c);
    }

    /* @methodtype set-method */
    public append(c: string): void {
        // this.assertIsNotNullOrUndefined(c);
        this.doAppend(c);
        // this.assertClassInvariance(this);
    }

    protected doAppend(c: string): void {
        this.components.push(c);
    }

    /* @methodtype set-method */
    public remove(i: number): void {
        // this.assertIsNotNullOrUndefined(i);
        // this.assertIdxInsideBounds(i);
        this.doRemove(i);
        // this.assertClassInvariance(this);
    }

    protected doRemove(i: number): void {
        this.components.splice(i,1);
    }
}