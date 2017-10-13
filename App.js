import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';

export default class App extends React.Component {

  state = {
    score: 0,
    question_id : 1,
    initial_q : false,
    data : [],
    questions: 0
  }

  _handleAnswer(answer) {
    if(this.state.data.answers == answer) {
        this.setState({
            score: this.state.score + 1
        });
    }

    this.setState({
        questions: this.state.questions + 1,
        question_id: this.state.question_id + 1
    });

    fetch('https://qriusity.com/v1/questions/' + this.state.question_id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data[0]
        });
    });
  }

  render() {
    if(this.state.initial_q == false){
        fetch('https://qriusity.com/v1/questions/' + this.state.question_id)
            .then((res) => res.json())
            .then((data) => {
              this.setState({
                data: data[0],
                initial_q: true,
                question_id: this.state.question_id + 1
              });
            });
    }

    return (
    <View style={styles.container}>
        <Text style={styles.score}>{"Score: " + this.state.score + " out of " + this.state.questions}</Text>
        <Text style={styles.question}>{this.state.data['question']}</Text>

        <TouchableHighlight
            style={styles.button}
            underlayColor={(this.state.data.answers == "1") ? ("#006400") : ("#B22222")}
            onPress={() => this._handleAnswer("1")}
          >
             <Text style={styles.answer}>{String(this.state.data['option1'])}</Text>
          </TouchableHighlight>

        <TouchableHighlight
            style={styles.button}
            underlayColor={(this.state.data.answers == "2") ? ("#006400") : ("#B22222")}
            onPress={() => this._handleAnswer("2")}
          >
             <Text style={styles.answer}>{String(this.state.data['option2'])}</Text>
          </TouchableHighlight>

        <TouchableHighlight
            style={styles.button}
            underlayColor={(this.state.data.answers == "3") ? ("#006400") : ("#B22222")}
            onPress={() => this._handleAnswer("3")}
          >
             <Text style={styles.answer}>{String(this.state.data['option3'])}</Text>
          </TouchableHighlight>

        <TouchableHighlight
            style={styles.button}
            underlayColor={(this.state.data.answers == "4") ? ("#006400") : ("#B22222")}
            onPress={() => this._handleAnswer("4")}
          >
             <Text style={styles.answer}>{String(this.state.data['option4'])}</Text>
          </TouchableHighlight>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
      fontSize: 24,
      color: 'black',
      textAlign: 'left',
      lineHeight: 32,
      padding: 15
  },
  score: {
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
        lineHeight: 20,
        padding: 15
  },
  answer: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'left',
    lineHeight: 40,
    padding: 15
  },
  button: {
      height: 110,
      backgroundColor: "#841584",
      borderColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
  }
});
