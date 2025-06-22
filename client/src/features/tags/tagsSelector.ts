import type { RootState } from "../../app/store";

export const selectAllTags = (state: RootState) => state.tags.tags;
export const selectTagById = (tagId: string) => (state: RootState) =>
    state.tags.tags.find((tag) => tag._id === tagId);
export const selectTagsLoading = (state: RootState) => state.tags.loading;
export const selectTagsError = (state: RootState) => state.tags.error;


