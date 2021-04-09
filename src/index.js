import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import quizService from './quizService/index';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';


class QuizBee extends Component{

  state={
    questionbank:[],
    score:0,
    responses:0
  };

  getquestion=()=>
  {
    quizService().then(question=>{
      this.setState({questionbank:question});
    });
  };

  playagain=()=>
  {
    this.getquestion();
    this.setState({score:0,responses:0});
  }

  componentDidMount(){
    this.getquestion();
  }

  computeanswer(a,b){
    if(a===b){
      this.setState({score:this.state.score+1});
    }

    this.setState({responses:this.state.responses+1});
  };

render(){
  return(
      <div className='container'>
        <div className='title'>QuizBee</div>
        {this.state.responses<5 && this.state.questionbank.map(({question,answers,correct,questionId})=>{
          return(<QuestionBox question={question} options={answers} key={questionId} selected={answer=>this.computeanswer(answer,correct)}/>);
        }) }

        {(this.state.responses===5)?<Result score={this.state.score} playAgain={this.playagain} />:null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBee/>,document.getElementById('root'));




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

