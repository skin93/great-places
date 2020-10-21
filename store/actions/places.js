import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = (title, imageUri) => async (dispatch) => {
  const fileName = image.split('/').pop()

  const newPath = FileSystem.documentDirectory + fileName

  try {
    await FileSystem.moveAsync({
      from: image,
      to: newPath,
    })
  } catch (err) {
    console.log(err)
    throw err
  }

  dispatch({ type: ADD_PLACE, payload: { title, imageUri: newPath } })
}
