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

var getJsonFromApi = require('./getJsonFromApi.js');


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
    var url = 'http://staging.bjornborg.vaimo.com/en/appapi/menu/list/?website=3&tree=1';



    getJsonFromApi(url).then((json) => {
      json = json.filter(function(categorty) {
        return categorty.entity_id === this.props.id
      }.bind(this));
      that.setState({ menu: json[0].children })
    }).catch((error) => {
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
          onPress={this.onMenuPress.bind(this, {id: item.entity_id || item.category_id, name: item.name})}>
          <Text>{ item.name }</Text>
        </TouchableHighlight>
      );
    })
  },

  render: function() {
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
