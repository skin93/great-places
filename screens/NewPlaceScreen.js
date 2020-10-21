import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native'

import { useDispatch } from 'react-redux'
import * as placesActions from '../store/actions/places'

import Colors from '../constants/Colors'

const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    setTitle(text)
  }

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title))
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
