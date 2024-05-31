import TagType from "./Tag";

export default interface EntityType {
    start: number;
    end: number;
    tag: TagType;
}