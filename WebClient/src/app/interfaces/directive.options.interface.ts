import {IDirectiveFactory} from "angular";

export interface IDirectiveOptions {
    name:string;
    directive:IDirectiveFactory;
    $inject:string[];
}