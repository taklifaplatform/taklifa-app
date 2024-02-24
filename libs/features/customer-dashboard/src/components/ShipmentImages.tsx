import React, { useState } from 'react';
import { YStack, Text, XStack } from 'tamagui';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { X } from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ShipmentImages() {
  const [images, setImages] = useState([]);

  const addNewImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    //console.info(JSON.stringify(pickerResult,null,2),'pickerResult=========')
    if (pickerResult.cancelled) {
      return;
    }

    const newImage = { id: images.length + 1, uri: pickerResult.assets[0].uri };
    setImages([...images, newImage]);
  };

  const removeImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
  };
  return (
    <YStack alignItems="flex-start" paddingVertical="$4" gap="$4">
      <Text fontSize="$3" fontWeight="600">
        صور الشحنة
      </Text>
      <XStack alignItems="center">
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({ item }) => (
            <YStack>
              <Image
                source={{ uri: item.uri }}
                width={80}
                height={80}
                style={{
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => removeImage(item.id)}
                style={{
                  position: 'absolute',
                  left: 10,
                  backgroundColor: 'black',
                  borderRadius: 50,
                  margin: 2,
                }}
              >
                <X size="$1" color={'color1'} />
              </TouchableOpacity>
            </YStack>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
        <TouchableOpacity
          onPress={() => addNewImage()}
          style={{
            backgroundColor: '#E0E0E0',
            height: 80,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
        >
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/768px-Antu_insert-image.svg.png',
            }}
            width={50}
            height={50}
          />
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
}
