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
        return this.unescapeString(array_list[x],DEFAULT_DELIMITER);
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
        this.noComponents--;
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


}