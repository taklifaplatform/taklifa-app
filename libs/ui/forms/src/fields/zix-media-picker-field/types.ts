import { MediaTransformer } from "@zix/api";
import { UploadableMediaFile } from "../../utils";

export type ZixMediaPreviewerProps = {
  previews: ZixMediaPickerTransformer[];
  onPress: () => void;
  onRemoveMedia?: (media: MediaTransformer) => void;
  placeholder?: string;
};

export type ZixMediaPickerTransformer =
  & Partial<MediaTransformer>
  & Partial<UploadableMediaFile>
  & {
    uploadProgress: number;
  };
