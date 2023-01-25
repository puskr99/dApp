import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,Button,DrawerLayoutAndroid, Touchable, Alert,} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { onAuthStateChanged , signOut } from 'firebase/auth';
import Drawer from './src/Drawer'
// import Register from './src/Register';
// import Login from './src/Login';
import AuthRegister from './src/AuthRegister';
import AuthLogin from './src/AuthLogin';
import { db ,auth } from './database/firebaseDB'

const Stack = createNativeStackNavigator();


export default function App() {

 const [user,setUser] = useState(null)

const UserPage = ({navigation})=>{
  return(
    <View>
  <Text > Hello {user} </Text>
  <Button
    title='Logout'
    onPress={async ()=>{
      await signOut(auth)
      setUser(null)
      Alert.alert('Logged Out Success')
    }
    }
  />
  </View>
  )
}

const checkAuth = async () => {
  try{
    onAuthStateChanged(auth,user=>{
      if(user){
                // Alert.alert('User Found',user.uid)
        setUser(user.uid)
      }
    })
  }catch(err){
    setUser(null)
  }

}
useEffect(() => {
  checkAuth()
  return () => {
  }
}, [])



// const ProfileScreen = ({navigation, route}) => {
//   return <>
//   <Text>This is {route.params.name}'s profile</Text>
//   <Button 
//     title='Drawer'
//     onPress={()=>
//     navigation.navigate('Drawer')
//     }
//     />
//   <LoaderScreen message={''} color={Colors.grey40}/>
//   </>
// };

  return (
    <>
    <NavigationContainer>
    { user !== null ?(
      <Stack.Navigator>
      <Stack.Screen name="UserPage" component={UserPage} />
      </Stack.Navigator>
      )
      :
      <Stack.Navigator>
      <Stack.Screen name="Login" component={AuthLogin} />
      <Stack.Screen name="Register" component={AuthRegister} />
      </Stack.Navigator>
    }
    </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
