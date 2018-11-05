export class OrderNoteObject {
    public note:string;
    public isResolved:boolean;

    constructor(note:string, isResolved:boolean = false) {
        this.note = note;
        this.isResolved = isResolved;
    }

    public get isReallyResolved():boolean {
        return this.note ? this.isResolved:true;
    }
}