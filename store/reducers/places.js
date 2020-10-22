import { ADD_PLACE, SET_PLACES } from '../actions/places'
import Place from '../../models/place'

const initialState = {
  places: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.imageUri,
        action.payload.address,
        action.payload.coords.lat,
        action.payload.coords.lng
      )
      return {
        places: state.places.concat(newPlace),
      }
    case SET_PLACES:
      return {
        places: action.payload.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        ),
      }
    default:
      return state
  }
}
