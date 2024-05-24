import TagType from "./Tag";

export default interface TokenType {
    index: number;
    tag: TagType;
    range: Array<number>
}