import * as ImageManipulator from 'expo-image-manipulator';

export async function compressImage(media: any) {
    try {
        const resizedPhoto = await ImageManipulator.manipulateAsync(
            media?.uri,
            [{ resize: { width: 1024 } }], // resize to width of 300 and preserve aspect ratio
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
        );
    
        return resizedPhoto;
    } catch (error) {
        console.log('===============')
        console.log('compressImage ERROR::', error)
        console.log('===============')
        return media;
    }
}   