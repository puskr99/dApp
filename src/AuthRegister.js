import React,{useState} from 'react'
import {View,Text,Button,TextInput,Alert} from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db ,auth } from '../database/firebaseDB'

const AuthRegister= ({navigation}) =>  {
    const [email,setEmail]=useState('')
    const [password,setPassword] = useState('')
    const [cpassword,setcPassword] = useState('')
    const validEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    const validPassword = /^(?=(.*[!@#$%^&*()\-__+.]){1,}).{6,}$/
  
      const submitHandler=  async () =>{
        if(!email || !password || !cpassword){
           Alert.alert('Fill all the spaces!')
        }
       else if(!email.match(validEmail)){
           Alert.alert('Email address Invalid !')
        }
        else if(!password.match(validPassword)){
          Alert.alert('Invalid ! Needs atleast 6 letters with one special symbol.')
        }
        else if(password !== cpassword){
          Alert.alert('Passwords not matched!')
        }
        else{
         try{
            await createUserWithEmailAndPassword(auth,email,password);
            Alert.alert('Registration Successful')
         }catch(e){
            Alert.alert('Email already exists !')
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
               secureTextEntry={true}
          />
          <Text style ={{color:'brown',fontSize:17,margin:5,}}>Confirm Password  </Text>
          <TextInput 
               style={{margin:10,borderColor:'pink',borderRadius:4,borderWidth:1,height:40,padding:10,fontSize:16,fontWeight:'bold'}}
               onChangeText={setcPassword} 
               secureTextEntry={true}
           />
          <Button 
                    onPress={submitHandler}
                    title='Register'
                    />
       <View style={{flexDirection:'row',margin:10}}>  
      <Text  style ={{ color:'brown',fontSize:17,textAlign:'center',}}> Already have an account? </Text>
      <Text onPress={()=>{
        navigation.navigate('Login')}}
        style ={{color:'blue',fontSize:17,textAlign:'center',textDecorationLine:'underline'}} >Login Here...</Text>
      </View>  

        </View>
      )

}

export default AuthRegister;