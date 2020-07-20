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
      loading: false,
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
        <Input autoCapitalize="none" value={this.state.txt} onChangeText={(txt) => {
          this.setState({ txt, view: false })
        }} placeholder="type a word..." rightIcon={
          <Icon name="search" onPress={this.search} />
        } />
        {this.state.loading ? <Text>Loading</Text> : null}
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
    this.setState({ loading: true })
    let term = this.state.txt.toLowerCase().trim();
    Keyboard.dismiss();
    this.setState({
      txt: '',
      loading: false,
      word: dictionary[term].word,
      lexo: dictionary[term].lexicalCategory,
      meanings: [dictionary[term].definition],
      view: true
    });
    console.log(term, dictionary[term]);
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

const dictionary = {
  "the": {
    "word": "the",
    "lexicalCategory": "Determiner",
    "definition": "denoting one or more people or things already mentioned or assumed to be common knowledge."
  },
  "india": {
    "word": "India",
    "lexicalCategory": "Noun",
    "definition": "a country in southern Asia occupying the greater part of the Indian subcontinent; population 1,311,000,000 (estimated 2015); official languages, Hindi and English (fourteen other languages are recognized as official in certain regions; of these, Bengali, Gujarati, Marathi, Tamil, Telugu, and Urdu have most first-language speakers); capital, New Delhi."
  },
  "externally": {
    "word": "externally",
    "lexicalCategory": "Adverb",
    "definition": "with reference to the outer surface or structure of something; outside"
  },
  "hello": {
    "word": "hello",
    "lexicalCategory": "Interjection",
    "definition": "used as a greeting or to begin a telephone conversation"
  },
  "welcome": {
    "word": "welcome",
    "lexicalCategory": "Noun",
    "definition": "an instance or manner of greeting someone"
  },
  "almost": {
    "word": "almost",
    "lexicalCategory": "Adverb",
    "definition": "not quite; very nearly"
  },
  "she": {
    "word": "she",
    "lexicalCategory": "Pronoun",
    "definition": "used to refer to a woman, girl, or female animal previously mentioned or easily identified"
  },
  "tree": {
    "word": "tree",
    "lexicalCategory": "Noun",
    "definition": "a woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground."
  },
  "wonderful": {
    "word": "wonderful",
    "lexicalCategory": "Adjective",
    "definition": "inspiring delight, pleasure, or admiration; extremely good; marvellous"
  },
  "ordinary": {
    "word": "ordinary",
    "lexicalCategory": "Adjective",
    "definition": "with no special or distinctive features; normal"
  }
}