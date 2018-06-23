import React from 'react';
import Field from './Field.jsx';
import fieldTemplate from '../fieldTemplate';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 5,
      field: fieldTemplate,
      round: [],
      answer: [],
      looser: false,
    }
  }

  onInput = (e) => {
    this.setState({ input: e.target.value });
  }

  generateRound = () => {
    const { input } = this.state;
    const round = [];

    for (let i = 0; i < input; i += 1) {
      round.push(Math.floor(Math.random() * 4))
    }

    let timeout = 0;

    round.forEach(blink => {
      setTimeout(() => this.toggleActive(blink), timeout);
      setTimeout(() => this.toggleActive(blink), timeout + 1000);
      timeout += 1500;
    })

    this.setState({ round, answer: [] });
  }

  toggleActive = (id) => {
    const { field } = this.state;

    const newField = field.map(row => row.map(button => button.id === id ? { ...button, active: !button.active }  : button))

    this.setState({ field: newField });
  }

  onStart = () => {
    this.generateRound();
  }

  onAnswer = (id) => () => {
    const { round, answer } = this.state;

    const newAnswer = [...answer, id];

    const looser = newAnswer.reduce((acc, item, index) => (item === round[index] ? acc : true), false);

    this.setState({ answer: newAnswer, looser });
  }

  render() {
    const { field, round, answer, looser } = this.state;

    const message = looser ? <p>You loose!</p> :
      round.length === answer.length && round.length !== 0 ? <p>Congratulations!</p> : null;

    return (
      <div>
        <Field field={field} handler={this.onAnswer} />
        <div className="ml-3">
          <button type="submit" className="btn btn-primary btn-sm" onClick={this.onStart}>Start</button>
          {message}
        </div>
      </div>
    )
  }
}
