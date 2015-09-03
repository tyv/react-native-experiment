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


var ReactNative = React.createClass({


  render: function() {

    return (
        <NavigatorIOS
          initialRoute={{
            component: MyApp,
            title: 'My View Title',
            passProps: { myProp: 'foo' },
          }}
        />
      );
  }
});


var MyApp = React.createClass({

  getInitialState: function() {
    return {
      menu: undefined
    };
  },

  componentWillMount: function() {
    console.log('componentWillMount');
    this.getMenu();
  },

  getMenu: function() {
    console.log('getMenu');
    var that = this;
    fetch('http://bjornborg-staging.vaimo.com/en/appapi/menu/list/?website=3&tree=1')
      .then((response) => response.text())
      .then((responseText) => {
        that.setState({ menu: JSON.parse(responseText).result })
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  renderLoading: function() {
    return <Text>Loading...</Text>;
  },

  onMenuPress: function(id) {
    console.log(id);
  },

  renderMenu: function() {
    return this.state.menu.map((item, index) => {
      return (
        <TouchableHighlight
          key={index}
          onPress={this.onMenuPress.bind(this, item.entity_id)}>
          <Text>{ item.name }</Text>
        </TouchableHighlight>
      );
    })
  },

  render: function() {

    return (
      <NavigatorIOS
            ref="nav"
            initialRoute={...}
          />
    );

    this.state.menu ? this.renderMenu() : this.renderLoading();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNative', () => ReactNative);
