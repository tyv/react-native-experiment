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
} = React;

var Products = require('./products.ios.js');


var SubMenu = React.createClass({

  getInitialState: function() {
    return {
      menu: undefined
    };
  },

  componentWillMount: function() {
    this.getMenu();
  },

  getMenu: function() {
    var that = this;
    var url = 'http://staging.bjornborg.vaimo.com/en/appapi/category/list/?website=3&detail=minimal&tree=0&category=' + this.props.id;
    fetch(url, { headers: { Authorization: 'Basic ' + btoa('demo:demo') } })
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
        that.setState({ menu: JSON.parse(responseText).result })
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  renderLoading: function() {
    return <Text>Loading...</Text>;
  },

  onMenuPress: function(cfg) {
    this.props.navigator.push({
      title: cfg.name,
      component: Products,
      passProps: {id: cfg.id}
    });

  },

  renderMenu: function() {
    return this.state.menu.map((item, index) => {
      return (
        <TouchableHighlight
          key={index}
          onPress={this.onMenuPress.bind(this, {id: item.entity_id, name: item.name})}>
          <Text>{ item.name }</Text>
        </TouchableHighlight>
      );
    })
  },

  render: function() {
    console.log('render');
    return (
      <View style={styles.container}>
        { this.state.menu ? this.renderMenu() : this.renderLoading() }
      </View>
    );
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

module.exports = SubMenu;
