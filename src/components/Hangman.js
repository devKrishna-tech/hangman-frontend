import React, { Component } from 'react';
import { TrophyTwoTone, FrownTwoTone } from '@ant-design/icons';

import './Hangman.css';

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";
import { Button, Flex, Spin } from 'antd';

class Hangman extends Component {
  static defaultProps = {
    images: [step0, step1, step2, step3, step4, step5, step6]
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: this.props.gameState ? this.props.gameState.incorrect_guesses : 0,
      guessed: new Set([]),
    }
  }
  handleGuess = e => {
    this.setState(st => ({
      guessed: st.guessed.add(e),
    }));
    console.log(e, "LETTER");
    this.props.makeGuess(e);
  }

  generateButtons() {
    return <Flex align='center' gap={2}>{"abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <Button
        type="primary"
        onClick={e => this.handleGuess(letter)}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </Button>
    ))}</Flex>
  }

  resetButton = () => {
    this.setState({
      guessed: new Set([]),
    });
    this.props.startGame();
  }

  render() {

    return (this.props.gameState ?
      <Flex vertical align='center' gap={10}>
        <h1 className='text-center'>Hangman</h1>
        <div className="float-right">Wrong Guesses: {this.props.gameState && this.props.gameState.incorrect_guesses} of {this.props.gameState && this.props.gameState.max_incorrect_guesses + 1}</div>
        {this.props.gameState && this.props.gameState.state === 'InProgress' ?
          <>
            <Flex align='center' justify='space-evenly'>
              <div className="text-center">
                <img src={this.props.images[this.props.gameState && this.props.gameState.incorrect_guesses]} alt="" />
              </div>
              <Flex vertical gap={15} justify='space-between' align='center'>
                <h3>Guess the Word:</h3>
                <p>
                  {this.props.gameState && this.props.gameState.display_word.split('').join(' ')}
                </p>
                <h4>{this.props.gameState && this.props.gameState.state}</h4>
              </Flex>
            </Flex>
            {this.generateButtons()}
          </>
          :
          <Flex vertical gap={50} align='center'>
            {this.props.gameState.state === 'Won' ? <TrophyTwoTone twoToneColor="gold"   style={{ fontSize: '100px', color: 'gold' }}/>: <FrownTwoTone twoToneColor="#eb2f96" style={{ fontSize: '100px', color: 'red' }}/>}
            <h1>{this.props.gameState.state}</h1>
          </Flex>
        }
        <button className='btn btn-info' disabled={this.state.guessed.length === 0} onClick={this.resetButton}>Reset</button>
      </Flex> :
      <React.Fragment>
        <div className="SpinnerOverlay__div">
        </div>
        <Spin tip="Loading"
          className='Spinner'
          color='#2196f3'
          size='25px'
        />
      </React.Fragment>
    )
  }
}

export default Hangman;