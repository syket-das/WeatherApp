import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

import { WEATHER_API_KEY, BASE_WEATHER_URL } from '@env';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import { ActivityIndicator } from 'react-native';

import { colors } from './utils/index';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';

export default function App() {
  const weather_key = WEATHER_API_KEY;
  const base_url = BASE_WEATHER_URL;
  const [errMessage, setErrMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');

  useEffect(() => {
    load();
  }, [unitSystem]);

  // --------------------------------------------------
  async function load() {
    setCurrentWeather(null);
    setErrMessage(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrMessage('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${weather_key}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrMessage('Something went wrong');
      }
    } catch (error) {
      console.log('errror', errMessage);
    }
  }
  // --------------------------------------------------

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitSystem={unitSystem}
          setUnitSystem={setUnitSystem}
        />
      </View>
    );
  } else if (errMessage) {
    return (
      <View style={styles.container}>
        <Text>{errMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
});
