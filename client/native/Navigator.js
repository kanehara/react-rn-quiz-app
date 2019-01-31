import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Home, Quiz, Results } from './screens'

const AppNavigator = createSwitchNavigator({
  home: { screen: Home },
  quiz: { screen: Quiz },
  results: { screen: Results }
});

export default createAppContainer(AppNavigator);
