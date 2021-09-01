
import { View,Text } from 'react-native';
import React ,{Component}from 'react';
import  firebase from 'firebase'
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';
const store = createStore(rootReducer,applyMiddleware(thunk))
const firebaseConfig = {
  apiKey: "AIzaSyBdZTecnmh9CMwr3IZZZWpAuABvGnSc2FE",
  authDomain: "my-project-dev-6dd06.firebaseapp.com",
  projectId: "my-project-dev-6dd06",
  storageBucket: "my-project-dev-6dd06.appspot.com",
  messagingSenderId: "355339439347",
  appId: "1:355339439347:web:be8da88aefcb25e533bb86",
  measurementId: "G-FZWFB3W41Q"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';


const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loaded:false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true,
        })
      }else{
        this.setState({
        loggedIn:true,
          loaded:true,
      })
    }
    })
  }

  render() {
    const{loggedIn,loaded}=this.state;
    if(!loaded){
      return(
        <View style={{flex:1,justifyContent:'center'}}>
          <Text >Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} option={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
     );
   }
   return(
     <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{headerShown:false}} />
      <Stack.Screen name="Add" component={AddScreen}  />
    </Stack.Navigator>
    </NavigationContainer>
   </Provider>
  )
  }
}

export default App




