import React, { Component } from 'react'
import {connect} from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import AddScreen from './main/Add'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        
        return (
            <Tab.Navigator>
            <Tab.Screen name="Feed" component={FeedScreen}
            options={{headerShown:false,
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                ),
                
            }} />
            
            <Tab.Screen name="Add" component={AddScreen}
            options={{headerShown:false,
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                ),
                
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen}
            options={{headerShown:false,
                tabBarIcon:({color,size})=>(
                    <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                ),
                
            }} />
            
            </Tab.Navigator>
        )
    }
}
const mapStateToProps = (store) =>
({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch)=>bindActionCreators({fetchUser},dispatch);

export default connect(mapStateToProps,mapDispatchProps)(Main);
