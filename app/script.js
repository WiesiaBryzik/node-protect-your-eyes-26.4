import React from 'react';
import { render } from 'react-dom';

// const formatTime = time => {
//     let mm = Math.floor(time / 60).padStart(2, '0');
//     let ss = (time % 60).padStart(2, '0')

//     return `${mm}:${ss}`;
//   };

const formatTime = time => {
  let mm = Math.floor(time / 60);
  let ss = time % 60;

  return ((mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss));
};


class App extends React.Component {

  state = {
    status: 'off',
    time: 3000,
    timer: null
  };

  step = () => {
    this.setState({
      time: this.state.time - 1,
    });

    if (this.state.time === 0 && this.state.status === 'work') {
      this.setState({
        status: 'rest',
        time: 20
      })
    } else if (this.state.time === 0 && this.state.status === 'rest') {
      this.setState({
        status: 'work',
        time: 1200
      })
    }
  };

  startTimer = () => {

    this.setState({
      timer: setInterval(this.step, 1000),
      time: 1200,
      status: 'work'
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer),

    this.setState({
      time: 1200,
      status: 'off'
    });
  };

  closeApp = () => {
    window.close() 
  };


  render() {

    const { status, time } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') &&
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close"onClick={this.closeApp}>X</button>
      </div>
    )
  };
};

render(<App />, document.querySelector('#app'));
