import * as FileSystem from 'expo-file-system'
import { insertPlace, fetchPlaces } from '../../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, imageUri) => async (dispatch) => {
  const fileName = imageUri.split('/').pop()

  const newPath = FileSystem.documentDirectory + fileName

  try {
    await FileSystem.moveAsync({
      from: imageUri,
      to: newPath,
    })
    const dbRes = await insertPlace(title, newPath, 'Dummy address', 15.6, 12.3)
    dispatch({
      type: ADD_PLACE,
      payload: { id: dbRes.insertId, title, imageUri: newPath },
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const loadPlaces = () => async (dispatch) => {
  try {
    const dbRes = await fetchPlaces()
    dispatch({ type: SET_PLACES, payload: dbRes.rows._array })
  } catch (err) {
    throw err
  }
}
