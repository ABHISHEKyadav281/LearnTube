
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentvideo:null,
    loading:false,
    error:false,
}
export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
      videoStart:(state)=>{
        state.loading=true;
      },
      videoSuccess:(state,action)=>{
        state.loading=false;
        state.currentvideo=action.payload;
      },
      videoFaliure:(state)=>{
        state.loading=false;
        state.error=true;
      },
      like:(state,action)=>{
        if(!state.currentvideo.likes.includes(action.payload)){
          state.currentvideo.likes.push(action.payload);
          state.currentvideo.dislikes.splice(state.currentvideo.dislikes.findIndex((userId)=>userId===action.payload),1)
        }
      },
      
      dislike:(state,action)=>{
        if(!state.currentvideo.dislikes.includes(action.payload)){
          state.currentvideo.dislikes.push(action.payload);
          state.currentvideo.likes.splice(state.currentvideo.likes.findIndex((userId)=>userId===action.payload),1)
        }
      }
      
    },
  });
  export const {videoStart,videoFaliure,videoSuccess,like,dislike}=videoSlice.actions;
  
  export default videoSlice.reducer;

