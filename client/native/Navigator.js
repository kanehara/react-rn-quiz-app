import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Home, Quiz } from './screens'

const AppNavigator = createSwitchNavigator({
  Home: { screen: Home },
  Quiz: { screen: Quiz },
});

export default createAppContainer(AppNavigator);
