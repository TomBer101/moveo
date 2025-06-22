import { useQueryClient } from "@tanstack/react-query";
import type { ITag } from "../types";

export function useTag(tagId: string): ITag | undefined  {
    const queryClient = useQueryClient();
    const tags = queryClient.getQueryData<ITag[]>(['tags']);
    return tags?.find((tag) => tag._id === tagId);
}
