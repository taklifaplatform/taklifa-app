import { useFieldInfo, useTsController } from '@ts-react/form'
import {
  Button,
  Fieldset,
  InputProps,
  Label,
  Stack,
  Theme,
  XStack,
  useThemeName
} from 'tamagui'
import { randomUUID } from 'expo-crypto'
import * as ImagePicker from 'expo-image-picker'
import { useId, useState } from 'react'

import { MediaTransformer } from '@zix/api'
import { ImagePlus, X } from '@tamagui/lucide-icons'
import { ZixMediaPickerField } from '../../fields'
import { uploadMediaFile } from '../../utils'
import { MediaFile, Shake } from '@zix/ui/common'
import { FieldError } from '../../common'

/* eslint-disable-next-line */
export interface MediaPickerFieldProps { }

export const MediaPickerField = (props: Pick<InputProps, 'size'>) => {
  const { field, error } = useTsController<MediaTransformer[]>()
  const { label, isOptional } = useFieldInfo()
  const themeName = useThemeName()
  const id = useId()

  const [files, setFiles] = useState<MediaTransformer[]>(field.value || [])
  const [uploadingFileStatus, setUploadingFileStatus] = useState<Record<string, boolean>>({})


  async function onAddMedia(media: ImagePicker.ImagePickerAsset): Promise<MediaTransformer> {
    const uuid = randomUUID()
    setFiles((prev: any[]) => [
      ...prev,
      {
        uuid,
        url: media.uri,
        original_url: media.uri,
      },
    ])
    setUploadingFileStatus((prev) => ({ ...prev, [uuid]: true }))
    const uploadedMedia = await uploadMediaFile(media)
    setUploadingFileStatus((prev) => ({ ...prev, [uuid]: false }))
    return uploadedMedia
  }

  async function onUploadMedias(medias: ImagePicker.ImagePickerAsset[]) {
    const uploadedMedias = await Promise.all(medias.map(onAddMedia))
    field.onChange([...(field.value || []), ...uploadedMedias])
  }

  function onRemoveMedia(media: MediaTransformer) {
    field.onChange(field.value?.filter((item) => item.uuid !== media.uuid))
    setFiles(files.filter((item) => item.uuid !== media.uuid))
  }

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Fieldset>
        {!!label && (
          <Label theme="alt1" size={props.size || '$3'} htmlFor={id}>
            {label} {isOptional && `(Optional)`} {files.length}
          </Label>
        )}
        <Shake shakeKey={error?.errorMessage}>
          <XStack space="$2">
            <Stack flexDirection="row" flexWrap="wrap" rowGap="$2" gap="$2">
              {files.map((image: MediaTransformer, index) => (
                <>
                  <Stack
                    key={index}
                    ai="center"
                    jc="center"
                    w="$6"
                    h="$6"
                    bc="$color9"
                    marginHorizontal="$1"
                    borderRadius="$4"
                  >
                    <MediaFile
                      media={image}
                      heightQuality={true}
                      placeholder={'image'}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        opacity: image?.uuid && uploadingFileStatus[image.uuid] ? 0.5 : 1,
                      }}
                    />
                    <Button
                      onPress={() => onRemoveMedia(image)}
                      bc="red"
                      p="$0"
                      w="$1.5"
                      h="$1.5"
                      position="absolute"
                      top="$-2"
                      left="$-2"
                      borderRadius="$12"
                      pressStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                      icon={<X size="$1.5" color="$color1" />}
                    />
                  </Stack>
                </>
              ))}
              <ZixMediaPickerField onChange={({ files }) => onUploadMedias(files)} isMultiple={true}>
                {
                  ({ onPress }) => (
                    <Stack onPress={onPress} ai="center" jc="center" w="$6" h="$6" bc="$color9" borderRadius="$4">
                      <ImagePlus size="$2" color="black" />
                    </Stack>
                  )
                }
              </ZixMediaPickerField>
            </Stack>
          </XStack>
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  )
}


export default MediaPickerField;
