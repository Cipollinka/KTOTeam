import React, {useState, useCallback, useRef} from 'react';
import {View, StyleSheet, Text, Dimensions, Platform} from 'react-native';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {debounce} from 'lodash';
import {Address} from '@/types/general';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBHo-nFVvTGd1LfpdBL4WXNgXJH8LNCWW8';

interface Props {
  address: Address;
  onSelect: (address: Address | null) => void;
}

const AddressSearch = ({address, onSelect}: Props) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const dropdownController = useRef(null);

  const fetchAddress = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_PLACES_API_KEY}&types=geocode&language=en`,
      );
      const json = await response.json();
      if (json.predictions) {
        setSuggestions(
          json.predictions.map((item: any) => ({
            id: item.place_id,
            title: item.description,
          })),
        );
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
    setLoading(false);
  };

  const debouncedFetchAddress = useCallback(debounce(fetchAddress, 300), []);

  return (
    <View style={styles.container}>
      <Text className="text-white mb-2">Address</Text>
      <AutocompleteDropdown
        dataSet={suggestions}
        direction={Platform.select({ios: 'down'})}
        onChangeText={debouncedFetchAddress}
        controller={controller => {
          dropdownController.current = controller;
        }}
        onSelectItem={item => onSelect(item || null)}
        loading={loading}
        debounce={300}
        textInputProps={{
          placeholder: 'Enter address',
          placeholderTextColor: '#71717A',
          autoCorrect: false,
          autoCapitalize: 'none',
          style: {
            backgroundColor: '#27272a',
            color: '#fff',
          },
        }}
        clearOnFocus={false}
        closeOnBlur={true}
        inputHeight={52}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
        useFilter={false}
        inputContainerStyle={{
          borderRadius: 12,
          backgroundColor: '#27272a',
        }}
        suggestionsListContainerStyle={{
          backgroundColor: '#27272a',
        }}
        containerStyle={{flexGrow: 1, flexShrink: 1}}
        renderItem={(item, text) => (
          <Text style={{color: '#fff', padding: 15}}>{item.title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default AddressSearch;
