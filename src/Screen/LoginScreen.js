import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = props => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  

  const login = async () => {
    setIsLoading(true);
    const axios = require('axios')
    await axios.post(
        "http://10.0.50.110:8085/isofhcare/adverser-event/authentication",
        {
            username: userName,
            password: password
        }
    ).then(s=>{
        AsyncStorage.setItem('userToken',s.data.token)
    }).catch(e=>console.log(e))
    setIsLoading(false)

    const userToken = await AsyncStorage.getItem('userToken')
    var jwtDecode = require('jwt-decode');
    var decoded = jwtDecode(userToken);
    console.log(decoded.sub)
    if (decoded.sub==='admin') {
      props.navigation.navigate('Admin')
    }else if (decoded.sub==='user'){
      props.navigation.navigate('User')
    }else{
      alert('ban nhap sai ')
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../res/background/giphy.gif')}
        />
      </View>
      <View style={styles.login}>
        <View style={{alignSelf: 'center', marginTop: 10}}>
          <Text style={{color: 'black', fontSize: 28, fontWeight: 'bold'}}>
            Cậu vàng
          </Text>
        </View>
        <View style={{marginHorizontal: 15, marginTop: 50}}>
          <View style={styles.input}>
            <Icon
              name="user"
              size={23}
              style={styles.inputIcon}
              color="#CCCCCC"
            />
            <TextInput
              placeholder="Username"
              style={styles.editText}
              value={userName}
              onChangeText={text => setUserName(text)}
            />
          </View>
          <View style={styles.input2}>
            <Icon
              name="lock"
              size={23}
              style={styles.inputIcon}
              color="#CCCCCC"
            />
            <TextInput
              placeholder="Password"
              style={styles.editText}
              value={password}
              onChangeText={pass => setPassword(pass)}
              secureTextEntry={true}
            />
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#00CBA7" style={{marginTop:60}}/>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={login}>
            <Text style={styles.buttonText}>Dang nhap</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

LoginScreen.navigationOptions = navData => {
  return {
    header: null,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#5FFFDE',
  },
  imageContainer: {
    width: 250,
    height: 200,
    alignSelf: 'center',
  },
  login: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 370,
    marginHorizontal: 20,
    elevation: 5,
    marginTop: 10,
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    flexDirection: 'row',
  },
  input2: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    flexDirection: 'row',
    marginTop: 30,
  },
  inputIcon: {
    alignSelf: 'center',
    paddingLeft: 10,
  },
  editText: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    paddingLeft: 10,
    width: '100%',
  },
  button: {
    marginTop: 60,
    width: 264,
    height: 42,
    alignSelf: 'center',
    backgroundColor: '#00CBA7',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LoginScreen;
