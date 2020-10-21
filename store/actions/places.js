import * as FileSystem from 'expo-file-system'
import { insertPlace } from '../../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = (title, imageUri) => async (dispatch) => {
  const fileName = imageUri.split('/').pop()

  const newPath = FileSystem.documentDirectory + fileName

  try {
    await FileSystem.moveAsync({
      from: imageUri,
      to: newPath,
    })
    const dbRes = await insertPlace(title, newPath, 'Dummy address', 15.6, 12.3)
    console.log(dbRes)
  } catch (err) {
    console.log(err)
    throw err
  }

  dispatch({
    type: ADD_PLACE,
    payload: { id: dbRes.insertId, title, imageUri: newPath },
  })
}
