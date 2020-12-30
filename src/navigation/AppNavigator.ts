import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/Home'
import GigsScreen from '../screens/Gigs'
import MessagesScreen from '../screens/Messages'
import ProfileScreen from '../screens/Profile'
import { createAppContainer } from 'react-navigation'
import ProducersScreen from '../screens/Producers';

const AppNavigator = createStackNavigator({
    Home: HomeScreen, 
    Gigs: GigsScreen,
    Messages: MessagesScreen,
    Profile: ProfileScreen,
    Producers: ProducersScreen
});

export default createAppContainer(AppNavigator);