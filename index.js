/**
 * @format
 */

import axios from 'axios';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import setupAxios from './src/shared/SetupAxios';

setupAxios(axios);

AppRegistry.registerComponent(appName, () => App);
