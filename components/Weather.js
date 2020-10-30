import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export const Weather = ({resultWeather}) => {
  const {name, main} = resultWeather;
  if (!name) return null;
  const kelvin = 273.15;

  return (
    <View style={styles.weather}>
      <Text style={[styles.text, styles.actual]}>
        {parseInt(main.temp - kelvin)}
        <Text style={styles.temp}>&#x2103;</Text>
        <Image
          style={{width: 66, height: 58}}
          source={{
            uri: `http://openweathermap.org/img/w/${resultWeather.weather[0].icon}.png`,
          }}
        />
      </Text>
      <View style={styles.temperatures}>
        <Text style={styles.text}>
          Min{' '}
          <Text style={styles.temp}>
            {parseInt(main.temp_min - kelvin)} &#x2103;
          </Text>
        </Text>
        <Text style={styles.text}>
          Max{' '}
          <Text style={styles.temp}>
            {parseInt(main.temp_max - kelvin)} &#x2103;
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weather: {
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 20,
  },
  actual: {
    fontSize: 80,
    fontWeight: 'bold',
    marginRight: 0,
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperatures: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
