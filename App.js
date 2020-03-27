/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList, 
  ActivityIndicator,
  Button
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";

export default class FlatListBasics extends Component  {
  
  constructor(props){
    super(props);
    this.state ={ isLoading: true, isNetwork: false}
  }

  render(){
    if(!this.state.isNetwork){
      return(
        <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
        <Text style={{alignSelf:'center', fontSize: 18, marginBottom:20, fontWeight:'bold', textAlign:'center'}}> Please Check Your Internet Connection.</Text>
        <Button
          style={{alignSelf:'center', fontSize: 18}}
          onPress={() => this.onReload()}
          title="RELOAD"
          color="#841584"
        />
        </View>
      )
    }

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <FlatList
           ItemSeparatorComponent = {() => (<View style={styles.separator} />)}
           data={this.state.dataSource}
           renderItem={({item}) => <View style={styles.item_container}>
                                      <Text style={{flex: 1, flexWrap:'wrap', fontWeight: "bold", fontSize: 18 }}>{'UserId = ' + item.userId}</Text>
                                      <Text style={{flex: 1,flexWrap:'wrap', fontSize: 20}}>{item.title}</Text>
                                      <Text style={[item.completed ? styles.text_completed : styles.text_not_completed]}>{'Completed = ' + item.completed}</Text>
                                     </View>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }

componentDidMount(){
 return NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    this.setState({
      isNetwork: state.isConnected
    })
    if(state.isConnected){
      this.getTodos()
    }
  });
}

getTodos(){
  return fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.json())
  .then((responseJson) => {

    this.setState({
      isLoading: false,
      dataSource: responseJson,
    }, function(){

    });

  })
  .catch((error) =>{
    console.error(error);
  });
}

onReload(){
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    this.setState({
      isNetwork: state.isConnected
    })
    if(state.isConnected){
      this.getTodos()
    }
  });
}

}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    margin: 10,
  },
  item_container: {
   flex: 1
  },
  separator: {
    borderBottomColor: '#d1d0d4',
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5
  },
  text_completed: {
    fontSize: 18, 
    alignSelf:'flex-end', 
    color:'#008000'
   },
   text_not_completed: {
    fontSize: 18, 
    alignSelf:'flex-end', 
    color:'#FF0000'
   },

});