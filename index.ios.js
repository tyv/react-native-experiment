/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NavigatorIOS
} = React;

var Menu = require('./menu.ios.js');

var ReactNative = React.createClass({
  getInitialState: function() {
    return {
      loaded: true
    };
  },

  render: function() {
    return <NavigatorIOS
            ref="nav"
            style={styles.nav}
            itemWrapperStyle={styles.navWrap}
            initialRoute={{
              title: "Main Page",
              component: Menu,
              passProps: {
                a: 'b'
              }
            }} />
  }
});

var styles = StyleSheet.create({
  navWrap: {
    flex: 1,
    marginTop: 70
  },
  nav: {
    flex: 1,
  },
  button: {
    backgroundColor: "#009DDD",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#fff"
  }
});


AppRegistry.registerComponent('ReactNative', () => ReactNative);
