import React from 'react';
import QuestionCard from '../../components/Cards/QuestionCard';
import AnswerCard from '../../components/Cards/AnswerCard';
import questionData from '../../helpers/data/questionData';
import NewCardForm from '../../components/Forms/NewCardForm';
import AppModal from '../../components/AppModal';

export default class FlashCard extends React.Component {
  state = {
    answer: false,
    flashCards: [],
    currentFlashCard: {},
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (!this.state.answer) {
      questionData.getQuestions().then((response) => {
        this.setState({
          flashCards: response,
          currentFlashCard: response[0],
        });
      });
    } else {
      const { flashCards } = this.state;
      const nextQuestion = flashCards.indexOf(this.state.currentFlashCard) + 1;
      this.setState({
        answer: false,
        currentFlashCard: flashCards[nextQuestion] || flashCards[0],
      });
    }
  };

  getUpdatedCard = () => {
    questionData.getQuestions().then((response) => {
      this.setState({
        flashCards: response,
        currentFlashCard: response[0],
        answer: false,
      });
    });
  };

  showAnswerToQuestion = (e) => {
    e.preventDefault();
    this.setState({
      answer: true,
    });
  };

  render() {
    const { answer, currentFlashCard } = this.state;
    const showQuestion = () => (
      <QuestionCard
        key={currentFlashCard.firebaseKey}
        card={currentFlashCard}
        showAnswer={this.showAnswerToQuestion}
        getUpdatedCard={this.getUpdatedCard}
      />
    );
    const showAnswer = () => (
      <AnswerCard
        key={currentFlashCard.firebaseKey}
        card={currentFlashCard}
        showNextQuestion={this.loadData}
        getUpdatedCard={this.getUpdatedCard}
      />
    );
    return (
      <div className='d-flex flex-column'>
        <AppModal
          title={'Add a Flash Card'}
          buttonLabel={'Create New Flash Card'}
          buttonColor={'primary'}
        >
          <NewCardForm onUpdate={this.loadData} />
        </AppModal>
        <div className='flash-card d-flex flex-wrap justify-content-center'>
          {answer === false ? showQuestion() : showAnswer()}
        </div>
      </div>
    );
  }
}
