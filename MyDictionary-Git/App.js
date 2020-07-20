import React from 'react';
import { StyleSheet, Text, View, Image, Keyboard } from 'react-native';
import { Header, Input, Icon } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      json: {},
      word: '',
      txt: '',
      meanings: [],
      lexo: '',
    }
  }
  render() {
    return (
      <View>
        <Header backgroundColor="#2E3192"
          placement
          centerComponent={{
            text: "MyDictionary",
            style: {
              fontSize: 24,
              color: '#fff'
            }
          }}
          leftComponent={
            <Image source={{
              uri: "https://whjr-v2-prod-bucket.s3.ap-south-1.amazonaws.com/2dfbbc4a-fd4f-4a6c-83c6-63c04f6110b9.png"
            }} style={{ width: 40, height: 40 }} />
          }
        />
        <Input autoCapitalize="none" value={this.state.txt} onChangeText={(txt) => { this.setState({ txt }) }} placeholder="type a word..." rightIcon={
          <Icon name="search" onPress={this.search} />
        } />
        {this.state.view ?
          <View style={styles.dictionary}>
            <View style={styles.entry}><Text style={styles.head}>Word: </Text><Text>{(this.state.word)}</Text></View>
            <View style={styles.entry}><Text style={styles.head}>Type: </Text><Text>{(this.state.lexo)}</Text></View>
            <View><Text style={styles.head}>Meaning: </Text>
              <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
                {
                  this.state.meanings.map((m, i) => (
                    <Text style={styles.meanings}>{m}</Text>
                  ))
                }
              </View>
            </View>
          </View>
          : null}
      </View >
    );
  }
  search = () => {
    fetch('https://whitehat-dictionary.glitch.me/?word=' + this.state.txt.toLowerCase().trim())
      .then(response => response.json())
      .then(data => {
        Keyboard.dismiss();
        this.setState({
          txt: '',
          json: JSON.parse(data).results[0],
        })
        let marr = [];
        let senses = this.state.json.lexicalEntries[0].entries[0].senses;
        let l = 3;
        if (senses.length < 3) l = senses.length;
        for (let s = 0; s < l; s++) {
          let sense = senses[s]
          if (sense.definitions) marr.push(sense.definitions[0])
        }
        this.setState({
          word: this.state.json.word,
          lexo: this.state.json.lexicalEntries[0].lexicalCategory.text,
          meanings: marr,
          view: true
        });
        console.log()
      })
  }
}

const styles = StyleSheet.create({
  entry: {
    flexDirection: 'row',
    alignItems: "flex-end"
  },
  head: {
    fontSize: 18,
    color: '#F7931e',
    fontWeight: 'bold',
  },
  meanings: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  dictionary: {
    width: '90%',
    alignSelf: "center",
    // alignItems: "center"
    // borderWidth: 1,
  }
});
