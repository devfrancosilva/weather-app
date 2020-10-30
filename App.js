/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Form} from './components/Form';
import {Weather} from './components/Weather';

const App = () => {
  const [search, setSearch] = useState({city: '', country: ''});
  const [callApi, setCallApi] = useState(false);
  const [resultWeather, setResultWeather] = useState({});
  const [bgColor, setBgColor] = useState('rgb(71, 149, 212)');
  const {city, country} = search;
  useEffect(() => {
    if (callApi) {
      getWeather();
    }
  }, [callApi]);
  useEffect(() => {
    if (Object.keys(resultWeather).length > 0) {
      const kelvin = 273.15;
      let {main} = resultWeather;
      let actual = main.temp - kelvin;

      console.log(actual);
      if (actual <= 10) {
        setBgColor('rgb(105, 108, 149)');
      } else if (actual > 10 && actual < 25) {
        setBgColor('rgb(71, 149, 212)');
      } else {
        setBgColor('rgb(178, 28, 61)');
      }
    }
  }, [resultWeather]);
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };
  const getWeather = async () => {
    const apiKey = '910906c18c36848884a9e502f13402c2';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      const result = await res.json();
      setResultWeather(result);
      setCallApi(false);
    } catch (error) {
      Alert.alert('Error', 'City not found', [{text: 'Ok'}]);
    }
  };

  const bgColorApp = {
    backgroundColor: bgColor,
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.content}>
            <Weather resultWeather={resultWeather} />
            <Form
              search={search}
              setSearch={setSearch}
              setCallApi={setCallApi}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: '2.5%',
  },
});

export default App;
