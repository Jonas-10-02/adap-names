import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public getChildNodes(): Set<Node> {
        return this.childNodes;
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }


    public override findNodes(bn: string, visited: Set<Node> = new Set<Node>()): Set<Node> {
        const result = super.findNodes(bn, visited);

        for (const child of this.getChildNodes()) {
            for (const matching of child.findNodes(bn, visited)){
                result.add(matching);
            }
        }
        return result;
    }
}