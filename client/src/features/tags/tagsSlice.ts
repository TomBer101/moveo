import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as tagService from "./tagsApi";
import type { ITag } from "../../types";


interface TagsState {
    tags: ITag[];
    loading: boolean;
    error: string | null;
}

const initialState: TagsState = {
    tags: [],
    loading: false,
    error: null,
}

export const fetchTags = createAsyncThunk<ITag[], void>(
    'tags/fetchTags',
    async () => {
        const response = await tagService.getTags();
        return response;
    }
);

export const createTag = createAsyncThunk<ITag, string>(
    'tags/createTag',
    async (name: string) => {
        const response = await tagService.createTag(name);
        return response;
    }
);

export const updateTag = createAsyncThunk<ITag, {id: string, name: string}>(
    'tags/updateTag',
    async ({id, name}: {id: string, name: string}) => {
        const response = await tagService.updateTag(id, name);
        return response;
    }
);

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTags.fulfilled, (state, action: PayloadAction<ITag[]>) => {
                state.loading = false;
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tags';
            })
            .addCase(createTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTag.fulfilled, (state, action: PayloadAction<ITag>) => {
                state.loading = false;
                state.tags.push(action.payload);
            })
            .addCase(createTag.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create tag';
            })
            .addCase(updateTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTag.fulfilled, (state, action: PayloadAction<ITag>) => {
                const index = state.tags.findIndex(tag => tag._id === action.payload._id);
                if (index !== -1) {
                    state.tags[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateTag.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update tag';
            })
    }
})

export default tagsSlice.reducer;
