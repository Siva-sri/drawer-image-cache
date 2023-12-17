import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GetImage() {
  const [images, setImages] = useState([]);
  let array;
  const getImages = async ()=>{
    const url = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s";
    let result = await fetch(url);
    result = await result.json();
    array = result.photos.photo;
    setImages(array);
  }
  const setUrl = async()=>{
    array?.map(async (arr)=>{
      await AsyncStorage.setItem(arr.title,arr.url_s);
    });
  }
  useEffect(()=>{
    getImages();
    setUrl();
  },[]);
  return (
       <View style={styles.container}>
        {/* <Text>Thank you God</Text> */}
        {images.length? images.map((image)=><Image style={{width:200, height:200}} key={image.id} source={{uri:image.url_s}}></Image>):null}
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
