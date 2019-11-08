import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from '../Components/Item';
import AsyncStorage from '@react-native-community/async-storage';

export default class User extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  getData = async () => {
    const axios = require('axios');
    const userToken = await AsyncStorage.getItem('userToken');
    axios.defaults.headers.common['X-Auth-Token'] = userToken;
    console.log(userToken);
    axios
      .get(
        'http://10.0.50.110:8085/isofhcare/adverser-event/v1/department?page=0&size=50',
      )
      .then(s => console.log(s))
      .catch(e => console.log(e));
  };

  componentDidMount() {
    getData();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Icon name="user" size={50} />
        </View>
        <View style={styles.buttonContainer}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Item title={item.name} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginTop: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});
