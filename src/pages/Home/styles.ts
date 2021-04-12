import { StyleSheet, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

const windowWidth = Dimensions.get('window').width;
const logoWidth = windowWidth * 0.68;
const logoHeight = (logoWidth * 7) / 16;
const buttonWidth = windowWidth * 0.77;
const buttonHeight = buttonWidth * 0.151351351;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  rectanglesTop: {
    height: `${Platform.OS === 'web' ? '1%' : '4%'}`,
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
  },
  rectangle1: {
    width: '25%',
    height: '100%',
    backgroundColor: '#ffc410',
  },
  rectangle2: {
    width: '25%',
    height: '100%',
    backgroundColor: '#71c3cf',
  },
  rectangle3: {
    width: '25%',
    height: '100%',
    backgroundColor: '#82bc72',
  },
  rectangle4: {
    width: '25%',
    height: '100%',
    backgroundColor: '#045199',
  },
  logo: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: logoWidth,
    height: logoHeight,
    maxWidth: 490,
    maxHeight: 200,
  },
  mainContent: {
    flex: 1,
    marginTop: '6%',
    backgroundColor: '#efefef',
    borderTopLeftRadius: windowWidth * 0.25,
    borderTopRightRadius: windowWidth * 0.25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  hand: {
    position: 'absolute',
    width: 500,
    height: 544,
    right: 30,
  },
  buttons: {
    alignItems: 'flex-end',
    marginBottom: '10%',
  },
  btnStart: {
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: '5%',
  },
  btnStartTxt: {
    color: '#efefef',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnDoubts: {
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnDoubtsTxt: {
    color: '#81ba75',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
