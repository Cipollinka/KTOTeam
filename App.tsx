import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ScreensContainer from './source/components/ScreensContainer';

import './global.css';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AutocompleteDropdownContextProvider>
          <ScreensContainer />
        </AutocompleteDropdownContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;
