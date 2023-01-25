import React,{useState} from 'react'
import {View,Text,Button,TextInput,Alert} from 'react-native'
import { db } from '../database/firebaseDB'
import { doc, getDoc } from "firebase/firestore";

const Login= () =>  {
    const [email,setEmail]=useState('')
    const [password,setPassword] = useState('')

    const submitHandler = async()=> {
        if(!email || !password ){
            Alert.alert('Fill all the spaces!')
         }
         else{
          const docRef = doc(db, "users", password+email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            Alert.alert("Logged In Successfully");
          } else {
            Alert.alert("Invalid credentials !");
          }
         }
    }

return (
    <View>
      <Text style ={{color:'brown',fontSize:17,margin:5,}}>Enter your email </Text>
      <TextInput 
           style={{margin:10,borderColor:'pink',borderRadius:4,borderWidth:1,height:40,padding:10,fontSize:16,fontWeight:'bold'}}
           onChangeText={setEmail}
       />
      <Text style ={{color:'brown',fontSize:17,margin:5,}}>Password</Text>
      <TextInput 
           style={{margin:10,borderColor:'pink',borderRadius:4,borderWidth:1,height:40,padding:10,fontSize:16,fontWeight:'bold'}}
           onChangeText={setPassword}
      />
      <Button 
                onPress={submitHandler}
                title='Login'
                />
      <Text style ={{ color:'brown',fontSize:17,textAlign:'center',margin:10,}}> Dont have an account ? Register Here...</Text>

    </View>
  )

}

export default Login;