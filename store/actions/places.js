import * as FileSystem from 'expo-file-system'
import { insertPlace, fetchPlaces } from '../../helpers/db'
import ENV from '../../env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, imageUri, location) => async (dispatch) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
  )

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const data = await res.json()
  if (!data.results) {
    throw new Error('Something went wrong!')
  }

  const address = data.results[0].formatted_address

  const fileName = imageUri.split('/').pop()

  const newPath = FileSystem.documentDirectory + fileName
  await FileSystem.moveAsync({
    from: imageUri,
    to: newPath,
  })

  const dbRes = await insertPlace(
    title,
    newPath,
    address,
    location.lat,
    location.lng
  )
  dispatch({
    type: ADD_PLACE,
    payload: {
      id: dbRes.insertId,
      title,
      imageUri: newPath,
      address,
      coords: { lat: location.lat, lng: location.lng },
    },
  })
}

export const loadPlaces = () => async (dispatch) => {
  try {
    const dbRes = await fetchPlaces()
    dispatch({ type: SET_PLACES, payload: dbRes.rows._array })
  } catch (err) {
    throw err
  }
}
