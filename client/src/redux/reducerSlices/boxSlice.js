import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    top:0,
    right:0,
    backgroundColor: 'red', 
    width: 50,
    height: 50,
    borderRadius: '0%'
}

const boxSlice = createSlice({
  name: 'box',
  initialState: initialState,
  reducers: {
    changeHeight(state) {
      if(state.borderRadius === '50%'){
        const newHeight = state.height + 5
        state.width = newHeight
        state.height = newHeight
      }else{
        state.height=state.height+5
      }

    },
    changeWidth(state) {
      if(state.borderRadius === '50%'){
        const newWidth = state.width + 5
        state.width = newWidth
        state.height = newWidth
      }else{
        state.width=state.width + 5
      }
    },
    changeShape(state) {
      state.borderRadius = '50%'
      state.width=state.height
    },
    changeBackgroundColor(state,actions) {
      state.backgroundColor = actions.payload
    },
    shiftPosition(state,actions) {
      state.right = actions.payload
    },
    shiftVertical(state,actions) {comm
      state.top = actions.payload
  },
  },
})

export const { changeHeight, changeShape,changeWidth,changeBackgroundColor, shiftPosition, shiftVertical } = boxSlice.actions
export default boxSlice.reducer