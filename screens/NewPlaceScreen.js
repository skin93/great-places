import React, { useState, useCallback } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
} from 'react-native'

import { useDispatch } from 'react-redux'
import * as placesActions from '../store/actions/places'

import ImageSelector from '../components/places/ImageSelector'
import LocationPicker from '../components/places/LocationPicker'

import Colors from '../constants/Colors'

const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const [selectedLocation, setSelectedLocation] = useState()

  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    setTitle(text)
  }

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location)
  }, [])

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title, selectedImage, selectedLocation))
    navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={titleChangeHandler}
        />
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  )
}

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
}

export default NewPlaceScreen

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
})
