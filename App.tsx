import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ScreensContainer from './source/components/ScreensContainer';

import './global.css';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <ScreensContainer />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;
