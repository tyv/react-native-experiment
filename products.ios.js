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
  ScrollView,
  TouchableHighlight,
  View,
  Image
} = React;

var getJsonFromApi = require('./getJsonFromApi.js');

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
    var url = 'http://staging.bjornborg.vaimo.com/en/appapi/category/products/?website=3&detail=minimal&category=' + this.props.id;

    getJsonFromApi(url).then((json) => {
      that.setState({ products: json })
    }).catch((error) => {
      console.warn(error);
    });
  },

  renderLoading: function() {
    return <Text>Loading...</Text>;
  },

  renderProducts: function() {
    return this.state.products.map((item, index) => {
      var img = item.image_urls && item.image_urls[0];
      return (
        <View style={styles.button} key={index}>
          <Image style={styles.img} source={{uri:img}} />
          <Text>{ item.name + ' ' + item.final_price }</Text>
        </View>
      );
    })
  },

  render: function() {
    return (
      <ScrollView
        scrollEventThrottle={200}
        contentInset={{top: -50}}
        style={styles.scrollView}
        >
        { this.state.products ? this.renderProducts() : this.renderLoading() }
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});

module.exports = Products;
