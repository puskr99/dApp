import React,{useState} from 'react'
import {View,Text,Button,TextInput,Alert} from 'react-native'
import { doc , setDoc , collection } from 'firebase/firestore'
import { getDoc } from "firebase/firestore";
import { db , auth } from '../database/firebaseDB'

const Register= ({navigation}) =>  {
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
           Alert.alert('Email address not Valid!')
        }
        else if(!password.match(validPassword)){
          Alert.alert('Invalid ! Needs atleast 6 letters with one special symbol.')
        }
        else if(password !== cpassword){
          Alert.alert('Passwords not matched!')
        }
        else{   
              const docRef = doc(db, "users", password+email);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                Alert.alert("Email already exists !");
                  } 
              else
              {
                try
                {
                  const userRef = collection(db, "users");
                  
                  await setDoc(doc(userRef, password+email), {
                      email : email,
                      password : password
                      });
                  Alert.alert('Registration Successfull')
                    }catch(error){
                  Alert.alert('Error Occured',error)
                }
              }; 
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
          <Text style ={{color:'brown',fontSize:17,margin:5,}}>Confirm Password  </Text>
          <TextInput 
               style={{margin:10,borderColor:'pink',borderRadius:4,borderWidth:1,height:40,padding:10,fontSize:16,fontWeight:'bold'}}
               onChangeText={setcPassword} 
           />
          <Button 
                    onPress={submitHandler}
                    title='Register'
                    />
          <Text style ={{ color:'brown',fontSize:17,textAlign:'center',margin:10,}}> Already have an account ? Login Here...</Text>

        </View>
      )

}

export default Register;