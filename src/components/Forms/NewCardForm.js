import React, { Component } from 'react';
import questionData from '../../helpers/data/questionData';

export default class NewCardForm extends Component {
  state = {
    firebaseKey: this.props.card?.firebaseKey || '',
    question: this.props.card?.question || '',
    answer: this.props.card?.answer || '',
    success: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.firebaseKey === '') {
      questionData.newQuestion(this.state).then(() => {
        this.props.onUpdate();
        this.setState({
          success: true,
        });
      });
    } else {
      questionData.editQuestion(this.state).then(() => {
        this.props.onUpdate();
        this.setState({
          success: true,
        });
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {(this.state.success === true) ? (
          <div class="alert alert-success" role="alert">Your Flash Card Was Successfully Uploaded!</div>
        ) : (
          <div></div>
        )}
        <input
          type='text'
          name='question'
          value={this.state.question}
          onChange={this.handleChange}
          placeholder='Question'
          className='form-control form-control-lg m-1'
          required
        />
        <input
          type='text'
          name='answer'
          value={this.state.answer}
          onChange={this.handleChange}
          placeholder='Answer'
          className='form-control form-control-lg m-1'
          required
        />
        <button className='btn btn-success'>Submit</button>
      </form>
    );
  }
}
