import React, { Component } from 'react';
import QuestionData from './Question/questions.json';
import './App.css';
import Question from './Question/Question';

//initializes App class
class App extends Component {
  //holds current state of variables which are modified by user
  state = {
    questions: [

    ],
    submit: null,
    showInstructions: false,
    userAnswers: [],
    quizResults: {},
    showResults: false
  }

  //opens and closes the instructions
  toggleInstructionsHandler = () => {
    const doesShow = this.state.showInstructions;
    this.setState({ showInstructions: !doesShow });
  }
  
  //activated by the "Click to Generate Questions" button
  //creates an array with 5 random questions out of the 50 questions in the data
  //adds a submit button which checks answers to the bottom of the screen
  createQuestionsArray = () => {

    this.setState({ userAnswers: [null, null, null, null, null] }, () => {
      //console.log(this.state.userAnswers) uncomment to monitor state
    }
    )

    let questionsList = [];
    
    QuestionData.map((question, index) => {
      return questionsList.push(question);

    })
    var randomNums = [];
    var questions5 = [];
    while (randomNums.length < 5) {
      var r = Math.floor(Math.random() * 50);
      if (randomNums.indexOf(r) === -1) {
        randomNums.push(r);
        questions5.push(questionsList[r]);
      }
      ;
    }
    this.setState({ questions: questions5 });

    this.setState({
      submit:
        <button onClick={this.checkAnswers}>
          Submit
      </button>
    })

  };

//stores the answers selected using radio inputs 
  //into the array in state holding the user's answers
  answerSelectedHandler = (event, id) => {
    const questionIndex = this.state.questions.findIndex(q => {
      return q.id === id;
    });

    const answers = [...this.state.userAnswers];
    answers[questionIndex] = event.target.value;
    this.setState({ userAnswers: answers }, () => {
      //console.log(this.state.userAnswers); uncomment to monitor state
    });
  }

  //stores the answers inputed by the user through text 
  //into the array in state holding the user's answers
  inputChangedHandler = (event, id) => {
    const questionIndex = this.state.questions.findIndex(q => {
      return q.id === id;
    });

    const question = {
      ...this.state.questions[questionIndex]
    };
    question.options = event.target.value;
    const questions = [...this.state.questions];
    questions[questionIndex] = question;
    this.setState({ questions: questions });


    const answers = [...this.state.userAnswers];
    answers[questionIndex] = event.target.value;
    this.setState({ userAnswers: answers }, () => {
      //console.log(this.state.userAnswers); uncomment to monitor state
    });

  }

//activated by the submit button
//checks to see all answers are responded to 
//calculates the total correct/incorrect
//changes state to display these questions
//adds data to the quizResults in state
  checkAnswers = () => {
    for (var x = 0; x < 5; x++) {
      if (this.state.userAnswers[x] === null) {
        alert("Please fill out all questions before submitting")
        return;
      }
    }
    var incorrect = [];
    var correct = [];
    var numCorrect = 0;
    for (var y = 0; y < 5; y++) {
      if (this.state.userAnswers[y] === this.state.questions[y].answer) {
        numCorrect++;
        var string = "";
        while (localStorage.getItem(this.state.questions[y].id + string)){
          string = string + " ";
        }
          localStorage.setItem(this.state.questions[y].id + string, "correct");
        correct.push(this.state.questions[y]);
      }
      else {
        var string1 = "";
        while (localStorage.getItem(this.state.questions[y].id + string1)){
          string1 = string1 + " ";
        }
          localStorage.setItem(this.state.questions[y].id + string1, "incorrect");
        incorrect.push(this.state.questions[y]);
      }

    }
    this.setState({ questions: [] })
    this.setState({ submit: null })
    this.setState({quizResults: {numCorrect: numCorrect, incorrect: incorrect, correct: correct}})
    this.setState({showResults: true})
  }

 //changes the state of showResults, allowing the 
 //user to exit results and go back to the starting
 //screen
returnHandler = () => {
  this.setState({showResults: false})
}
//renders elements into the interface
  render() {
    let instructions = null;

    //if the user has decided to open the instructions,
    //the following instructions are displayed
    if (this.state.showInstructions) {
      instructions = (<div className = "box">
        <br></br>
        <br></br>
        <div align = "left">
        Welcome to the FBLA 5 Question Quiz! 
        Please fill out the following 5 questions 
        and click submit to receive your answer. 
        Refresh to receive a new set of questions. 
        Please use the Q and A below to clear up 
        any confusion. Thanks! 
        <br></br>
        <br></br>
        Q: How do I get my results? <br></br>
        A: Submit answers and click on the summary link! <br></br><br></br>
        Q: How many questions are available?<br></br>
        A: There are 50 unique questions! <br></br><br></br>
        Q: Do I have to take the first quiz that come up?<br></br>
        A: You can use the "Click to Generate Questions" 
        button as many times as you would like. <br></br><br></br>
        Q: What is generated in the results?<br></br>
        A: You will able to see your score, correct and 
        incorrect questions<br></br>
        </div>
        <br></br>
        <br></br>
      </div>);

    }
//creates a variable qustions which holds all of the question elements
//which will be displayed on screen
    let questions = (
      <div>
        {this.state.questions.map((question, index) => {

          return <Question
            id={question.id}
            key = {question.id}
            question={question.question}
            answer={question.answer}
            options={question.options}
            qType={question.qType}
            changedInput={(event) => this.inputChangedHandler(event, question.id)}
            selected={(event) => this.answerSelectedHandler(event, question.id)}
          />
        })}

      </div>
    )

    //displays the starting content (instructions and generate questions buttons)
        let content = 
        (<div>
            <button
                className={'btnClass'}
                onClick={this.toggleInstructionsHandler}>Click To Open/Close Instructions</button>
                {instructions}
            <button
                  onClick={this.createQuestionsArray}> Click to Generate Questions
            </button>
                {questions}
                {this.state.submit}
        </div> );
//if the user has decided to show results, the screen only shows the 
//data stored in quizResults
        if (this.state.showResults){
            content = (
              <div className={'box'}>
                <br></br>
              You received {this.state.quizResults.numCorrect} out of 5 points <br></br>
              <br></br> <br></br> <br></br>
             <b> These were the questions you got correct: </b> <br></br><br></br>
    
              {this.state.quizResults.correct.map((question, index) =>{
                  return <div >
                    {question.question} 
                    <br></br>
                   Correct Answer: {question.answer}
                   <br></br>
                   <br></br>
                        </div>
              })}
              <br></br>
             
             <b> These were the questions you got incorrect: </b><br></br> 
             <br></br>
              {this.state.quizResults.incorrect.map((question, index) =>{
                  return <div >
                    {question.question} 
                    <br></br>
                    Correct Answer: {question.answer}
                    <br></br>
                    <br></br>
                    
                        </div>
              })}
             <button onClick = {this.returnHandler}>Return to Start</button>
              </div>
            );
        }
//this is what is exported through "export default App" at the bottom
//of the screen
    return (
      <div className={'App'}>
        <h1>FBLA 5 Question Quiz</h1>
        <h3>Test Your Knowledge of FBLA and its History</h3>
      {content}
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
    );

  }
}

export default App;
