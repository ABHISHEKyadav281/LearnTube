
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentuser:null,
    loading:false,
    error:false,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginStart:(state)=>{
        state.loading=true;
      },
      loginSuccess:(state,action)=>{
        state.loading=false;
        state.currentuser=action.payload;
      },
      loginFaliure:(state)=>{
        state.loading=false;
        state.error=true;
      },
      logout:(state)=>{
       state.currentuser=null;
       state.loading=false;
       state.error=false;
      },
      sub:(state,action)=>{
        if(!state.currentuser.subscribedUsers.includes(action.payload)){
          state.currentuser.subscribedUsers.push(action.payload);
        }
        else{
          state.currentuser.subscribedUsers.splice(state.currentuser.subscribedUsers.findIndex(channelId=>channelId===action.payload),1)
        }
      }
    },
  });
  export const {loginStart,loginFaliure,loginSuccess,logout,sub}=userSlice.actions;
  
  export default userSlice.reducer;

