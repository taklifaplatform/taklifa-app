import { IMediaFile } from "../extra-types";
import { supabase } from "./client/client";

export type UploadMediaFileProps = {
  file: IMediaFile;
  bucket: string;
  path: string;
};

export async function uploadMediaFile({
  file,
  bucket,
  path,
}: UploadMediaFileProps): Promise<IMediaFile | null> {
  const { data, error } = await supabase.storage.from(bucket).upload(
    path,
    {
      uri: file.uri,
      fileName: file.file_name,
      mimeType: file.file_type,
    },
    {
      upsert: true,
      contentType: file.mimeType,
    },
  );

  if (error) {
    console.error("uploadFile->ERROR::", JSON.stringify(error, null, 2));
    return null;
  }

  const publicUrlRes = await supabase.storage
    .from(bucket)
    .getPublicUrl(data.path.replace(`${bucket}/`, ""));

  return {
    id: data.id,
    uri: publicUrlRes.data.publicUrl,
    file_name: file.fileName,
    file_type: file.mimeType,
  };
}
