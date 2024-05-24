import TagType from "./Tag";

export default interface TagContextType {
    selectedTag:TagType | null;
    setSelectedTag: (tag: TagType) => void
}