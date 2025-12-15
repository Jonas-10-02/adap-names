import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);

        // initial conversion in data string format
        let tmp_array = this.asStringArray(source, this.delimiter);
        tmp_array = tmp_array.map((element) => this.escapeString(element,DEFAULT_DELIMITER));

        this.name = tmp_array.join(DEFAULT_DELIMITER);
        this.noComponents = tmp_array.length;
        // this.assertClassInvariance(this);
    }

    public clone(): Name {
        return this.doClone();
    }

    protected doClone(): Name {
        let deepCopy: Name = new StringName("", this.delimiter);
        deepCopy.concat(this);
        return deepCopy;
    }

    public getNoComponents(): number {
        return this.doGetNoComponents();
    }

    protected doGetNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        // this.assertIsNotNullOrUndefined(i);
        // this.assertIdxInsideBounds(i);
        return this.doGetComponent(i);

    }

    protected doGetComponent(i: number): string {
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        return this.unescapeString(array_list[i],DEFAULT_DELIMITER);
    }

    public setComponent(i: number, c: string): void {
        // this.assertIsNotNullOrUndefined(i);
        // this.assertIsNotNullOrUndefined(c);
        // this.assertIdxInsideBounds(i);
        this.doSetComponent(i,c);
    }

    protected doSetComponent(i: number, c: string): void {
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        array_list[i] = c;
        this.name = array_list.join(this.delimiter);
    }

    public insert(i: number, c: string) {
        // this.assertIsNotNullOrUndefined(i);
        // this.assertIsNotNullOrUndefined(c);
        // this.assertIdxInsideBounds(i);
        this.doInsert(i,c);
    }

    protected doInsert(i: number, c: string): void {
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        array_list.splice(i,0,c);
        this.name = array_list.join(DEFAULT_DELIMITER);
        this.noComponents++;
    }

    public append(c: string) {
        // this.assertIsNotNullOrUndefined(c);
        // this.assertClassInvariance(this);
        this.doAppend(c);
    }

    protected doAppend(c: string): void {
        this.name = this.name + DEFAULT_DELIMITER + c;
        this.noComponents++;
    }

    public remove(i: number) {
        // this.assertIsNotNullOrUndefined(i);
        // this.assertIdxInsideBounds(i);
        // let old_count: number = this.getNoComponents();
        // this.assertValidComponentNo(old_count);
        
        this.doRemove(i);

        // postcondition check size change of getNoComponents
        // this.assertValidComponentNo(old_count-1);
        // this.assertClassInvariance(this);
    }

    protected doRemove(i: number): void {
        let array_list: string[] = this.asStringArray(this.name, DEFAULT_DELIMITER);
        array_list.splice(i,1);
        this.noComponents--;
        this.name = array_list.join(DEFAULT_DELIMITER);
    }

}