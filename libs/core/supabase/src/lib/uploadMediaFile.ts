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
    } as unknown as File,
    {
      upsert: true,
      contentType: file.file_type,
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
    ...file,
    id: (data as { path: string; id: string }).id,
    uri: publicUrlRes.data.publicUrl,
  };
}
