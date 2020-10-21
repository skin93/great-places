import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import BaseHeaderButton from '../components/UI/BaseHeaderButton'

const PlacesListScreen = () => {
  return (
    <View>
      <Text>Places List Screen</Text>
    </View>
  )
}

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={BaseHeaderButton}>
        <Item
          title='Add Place'
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace')
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default PlacesListScreen

const styles = StyleSheet.create({})
