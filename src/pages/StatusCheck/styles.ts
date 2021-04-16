import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const logoWidth = windowWidth * 0.47;
const logoHeight = logoWidth * 0.3;
const buttonWidth = windowWidth * 0.77;
const buttonHeight = buttonWidth * 0.151351351;
const marginItemsLeft = windowWidth * 0.15;
const marginItemTitle = windowHeight * 0.025;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    resizeMode: 'cover',
  },
  logo: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%',
  },
  logoImg: {
    width: logoWidth,
    height: logoHeight,
  },
  menu: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderTopStartRadius: windowWidth * 0.25,
    borderTopEndRadius: windowWidth * 0.25,
  },
  pageTitle: {
    top: '-3%',
    alignSelf: 'center',
    width: buttonWidth,
    height: buttonHeight,
    backgroundColor: '#034f9a',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: marginItemTitle,
  },
  pageTitleText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  items: {
    marginLeft: marginItemsLeft,
  },
  textInput: {
    marginBottom: 24,
    width: '80%',
  },
  input: {
    borderColor: 'rgba(56, 53, 53, 0.5)',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  submit: {
    width: '70%',
    height: '35%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: '5%',
  },
  submitTxt: {
    color: '#efefef',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  btnBack: {
    marginTop: '5%',
    marginBottom: '10%',
    width: '40%',
    height: '5%',
    backgroundColor: '#73c2cf',
    borderTopEndRadius: 4,
    borderBottomEndRadius: 4,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  btnBackText: {
    marginRight: '12%',
    color: '#085188',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default styles;
