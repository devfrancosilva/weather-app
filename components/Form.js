import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-community/picker';
export const Form = ({search, setSearch, setCallApi}) => {
  const {city, country} = search;
  const [animationBtn] = useState(new Animated.Value(1));

  const animationIn = () => {
    Animated.spring(animationBtn, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const animationOut = () => {
    Animated.spring(animationBtn, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const animationStyle = {
    transform: [{scale: animationBtn}],
  };

  const getWeather = () => {
    if (city.trim() === '' || country.trim() === '') {
      Alert.alert('Error', 'All fields are required', [{text: 'Ok'}]);
      return;
    }
    setCallApi(true);
  };
  return (
    <>
      <View>
        <View>
          <TextInput
            placeholder="City..."
            placeholderTextColor="#666"
            style={styles.input}
            value={city}
            onChangeText={(city) => setSearch({...search, city})}
          />
        </View>
        <View>
          <Picker
            style={{backgroundColor: '#fff'}}
            itemStyle={{textAlign: 'center'}}
            selectedValue={country}
            onValueChange={(country) => setSearch({...search, country})}>
            <Picker.Item label="--Select your country--" value="" />
            <Picker.Item label="Estados unidos" value="US" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Costa rica" value="CR" />
            <Picker.Item label="Peru" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={animationIn}
          onPressOut={animationOut}
          onPress={getWeather}>
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.btnText}>Search weather</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 10,
    height: 50,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnSearch: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
