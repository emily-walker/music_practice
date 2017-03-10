import React, {Component} from 'react';
import Sound from 'react-sound';

// App component - represents the whole app
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pianoStatus: "PAUSED",
            violinStatus: "PAUSED",
            trumpetStatus: "PAUSED",
            position: 0
        };
    }

    handlePianoClick(event, prevState) {
        event.preventDefault();
        this.setState(prevState => ({
            pianoStatus: !prevState.pianoStatus
        }));
    }

    handleViolinClick(event, prevState) {
        event.preventDefault();
        this.setState(prevState => ({
            violinStatus: !prevState.violinStatus
        }));
    }

    handleTrumpetClick(event, prevState) {
        event.preventDefault();
        this.setState(prevState => ({
            trumpetStatus: !prevState.trumpetStatus
        }));
    }

    handlePlaying(event) {
        this.setState({position: event.position});
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Click a button to start :)</h1>
                </header>
                <Sound
                    id="piano"
                    url="http://www.piano-midi.de/mp3/BFFCEDC41B391847DAE02F6A5EA1E1A8/alb_esp2.mp3"
                    playStatus={this.state.pianoStatus
                    ? "PAUSED"
                    : "PLAYING"}
                    onPlaying={this.handleSongPlaying}
                    position={this.state.position}/>
                <Sound
                    id="trumpet"
                    url="http://www.mfiles.co.uk/mp3-downloads/purcell-funeral-music-for-queen-mary.mp3"
                    playStatus={this.state.trumpetStatus
                    ? "PAUSED"
                    : "PLAYING"}
                    onPlaying={this.handleSongPlaying}
                    position={this.state.position}/>
                <Sound
                    id="violin"
                    url="http://www.gyrosquartet.com/audio/Pachelbel.mp3"
                    playStatus={this.state.violinStatus
                    ? "PAUSED"
                    : "PLAYING"}
                    onPlaying={this.handleSongPlaying}
                    position={this.state.position}/>
                <button
                    onClick={this
                    .handlePianoClick
                    .bind(this)}
                    className="piano">Piano</button>
                <button
                    onClick={this
                    .handleViolinClick
                    .bind(this)}
                    className="violin">Violin</button>
                <button
                    onClick={this
                    .handleTrumpetClick
                    .bind(this)}
                    className="trumpet">Trumpet</button>
            </div>
        );
    }
}
