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


var Products = React.createClass({

  getInitialState: function() {
    return {
      products: undefined
    };
  },

  componentWillMount: function() {
    this.getProducts();
  },

  getProducts: function() {
    var that = this;
    // var url = 'getProducts';
    // fetch(url)
    //   .then((response) => response.text())
    //   .then((responseText) => {
    //     console.log(responseText);
    //     that.setState({ products: JSON.parse(responseText).result })
    //   })
    //   .catch((error) => {
    //     console.warn(error);
    //   });
    //
    setTimeout(() => { that.setState({ products: [{name: 'a'}, {name: 'b'}]}) }, 5000);
  },

  renderLoading: function() {
    return <Text>Loading...</Text>;
  },


  renderMenu: function() {
    return this.state.products.map((item, index) => {
      return (
        <TouchableHighlight
          key={index}>
          <Text>{ item.name }</Text>
        </TouchableHighlight>
      );
    })
  },

  render: function() {
    return (
      <View style={styles.container}>
        { this.state.products ? this.renderMenu() : this.renderLoading() }
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

module.exports = Products;
