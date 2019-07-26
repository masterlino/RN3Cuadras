
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Preferences extends Component
{

  state = {
    distance: 2000,
    resultsLimit: 20,
    cheapS: true,
    averageS: true,
    expensiveS: true,
    veryExpensiveS: true,
    textLocation: "",
  };

  static navigationOptions = {
      title: "Configuración",
  };

  constructor(props) {
    super(props);    
  }
  
  componentWillMount() {
    this.loadPreferences();
  }

  async loadPreferences() {
    
    let mDistance = 4000;
    let mResultsLimit = 1;
    let mCheapS = true;
    let mAverageS = true;
    let mExpensiveS = true;
    let mVeryExpensiveS = true;
    let mTextLocation = ""


    try{
      mDistance = await AsyncStorage.getItem('distance');
      this.setState({distance: parseInt(mDistance, 10)});
      mResultsLimit = await AsyncStorage.getItem('resultsLimit');
      this.setState({resultsLimit: parseInt(mResultsLimit, 10)});
      mCheapS = await AsyncStorage.getItem('cheapS') == true ? true: false;
      this.setState({cheapS: mCheapS});
      mAverageS = await AsyncStorage.getItem('averageS') == "1" ? true: false;
      this.setState({averageS: mAverageS});
      mExpensiveS = await AsyncStorage.getItem('expensiveS') == "1" ? true: false;
      this.setState({expensiveS: mExpensiveS});
      mVeryExpensiveS = await AsyncStorage.getItem('veryExpensiveS') == "1" ? true: false;
      this.setState({veryExpensiveS: mVeryExpensiveS});  
      mTextLocation = await AsyncStorage.getItem('textLocation');
      this.setState({textLocation: mTextLocation});  
    }
    catch (error){
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Text>
          DISTANCIA MAXIMA METROS (50m - 4000m): {this.state.distance}
        </Text>
        <TextInput
          style={styles.textAddress}
          keyboardType = "number-pad"
          multiline = {true}
          numberOfLines = {1}
          onChangeText={(text) => {this.setState({distance: text});
                                  AsyncStorage.setItem('distance', text);
                                  }}
          value={this.state.distance.toString()}
          editable = {true}
          maxLength = {4}
          autoFocus = {false}
        />
        <View style={ styles.detailContainer}>
          <Text>
            Establecimientos baratos: {}
          </Text>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleCheap}
            value = {this.state.cheapS}/>
        </View>
        <View style={ styles.detailContainer}>
          <Text>
            Establecimientos medios: {}
          </Text>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleAverage}
            value = {this.state.averageS}/>
        </View>
        <View style={ styles.detailContainer}>
          <Text>
            Establecimientos caros: {}
          </Text>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleExpensive}
            value = {this.state.expensiveS}/>
        </View>
        <View style={ styles.detailContainer}>
          <Text>
            Establecimientos muy caros: {}
          </Text>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleVeryExpensive}
            value = {this.state.veryExpensiveS}/>
        </View>
        <Text>
          LIMITE DE RESULTADOS (1 - 50): {this.state.resultsLimit}
        </Text>
        <TextInput
          style={styles.textAddress}
          keyboardType = "number-pad"
          multiline = {true}
          numberOfLines = {1}
          onChangeText={(text) => {this.setState({resultsLimit: text});
                                  AsyncStorage.setItem('resultsLimit', text);
                                  }}
          value={this.state.resultsLimit.toString()}
          editable = {true}
          maxLength = {2}
          autoFocus = {false}
        />
        <Text>
          Localizacion (ej. "New York City", "NYC", "350 5th Ave, New York, NY 10118"): }
        </Text>
        <TextInput
          style={styles.textAddress}
          multiline = {true}
          numberOfLines = {2}
          onChangeText={(text) => {this.setState({textLocation: text});
                                  AsyncStorage.setItem('textLocation', text);
                                  }}
          value={this.state.textLocation}
          editable = {true}
          maxLength = {40}
          autoFocus = {false}
        />
        </ScrollView>
      </View> 
    );
  }

toggleCheap = (value) => {
    this.setState({cheapS: value});
    let mboolS = value? "1" : 0 ;
    AsyncStorage.setItem('cheapS', mboolS);
 }

 toggleAverage = (value) => {
  this.setState({averageS: value});
  let mboolS = value? "1" : 0 ;
  AsyncStorage.setItem('averageS', mboolS);
}

toggleExpensive = (value) => {
  this.setState({expensiveS: value});
  let mboolS = value? "1" : 0 ;
  AsyncStorage.setItem('expensiveS', mboolS);
}

toggleVeryExpensive = (value) => {
  this.setState({veryExpensiveS: value});
  let mboolS = value? "1" : 0 ;
  AsyncStorage.setItem('veryExpensiveS', mboolS);
}
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 15
  },
  textAddress:{
    color: 'darkblue',
    backgroundColor: 'aliceblue',
    marginTop: 5,
    marginBottom: 15, 
  }

});
