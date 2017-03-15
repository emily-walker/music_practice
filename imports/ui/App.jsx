import React, {Component} from 'react';

// App component - represents the whole app
export default class App extends Component {

    constructor(props) {
        super(props);
        this.selectedCheckboxes = [];
        this.songLength = 2000;
        this.loopLength = 250;
        this.instruments = {
            organ: {
                audio: new Audio('/audio/organ-1.mp3'),
                filename: '/audio/organ-1.mp3'
            },
            clap: {
                audio: new Audio('/audio/clap.mp3'),
                filename: '/audio/clap.mp3'
            },
            cymbal: {
                audio: new Audio('/audio/cymbal.mp3'),
                filename: '/audio/cymbal.mp3'
            }
        }
        this.song = JSON.parse(JSON.stringify(this.instruments));
        for (var key in this.song) {
            if (this.song.hasOwnProperty(key)) {
                this.song[key] = [];
                for (var j = 0; j < (this.songLength / this.loopLength); j++) {
                    this
                        .song[key]
                        .push(false);
                }
            }
        }
        console.log(this.song);
    }

    toggleCheckboxChange(event) {
        var instrument = event
            .target
            .getAttribute('data-instrument');
        var time = event
            .target
            .getAttribute('data-time');
        if (this.song[instrument][time] === false) {
            this.song[instrument][time] = true;
        } else {
            this.song[instrument][time] = false;
        }
    }

    handleSubmit(event) {
        this.playSong();
    }

    playSong() {
        var started = Date.now();

        var currentSecond = -1;
        var playSongInterval = window.setInterval(function () {
            if (Date.now() - started > this.songLength) {
                clearInterval(playSongInterval);
            } else {
                if (Math.floor((Date.now() - started) / this.loopLength) > currentSecond) {
                    currentSecond += 1;

                    Object
                        .keys(this.song)
                        .forEach(function (instrument) {
                            if (this.song[instrument][currentSecond]) {
                                this.playInstrument(instrument);
                            }
                        }.bind(this));
                }
            }
        }.bind(this),this.loopLength);
    }

    playInstrument(instrument) {
        console.log(this.song);
        console.log(instrument);
        instrumentAudio = this.instruments[instrument].audio;

        instrumentAudio.play();
    }

    recursivePause(instruments, instrumentAudio) {
        for (var key in instruments) {
            if (instruments.hasOwnProperty(key)) {
                if (typeof instruments[key] == "object" && instruments[key] !== null) 
                    this.recursivePause(instruments[key]);
                else {
                    if (!instruments[key] === instrumentAudio) {
                        instruments[key].pause();
                    }
                }
            }
        }
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Hello! :)</h1>
                </header>
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            {(function (headerRows, i, length) {
                                while (++i < length) {
                                    headerRows.push(
                                        <td key={i}>{i}</td>
                                    )
                                }
                                return headerRows;
                            })([], -1, (this.songLength / this.loopLength))}
                        </tr>
                    </thead>
                    <tbody>
                        {(function (nodeArr, rowArr) {
                            var instruments = Object.keys(this.instruments);
                            for (var i = 0; i < instruments.length; i++) {
                                for (var j = 0; j < (this.songLength / this.loopLength); j++) {
                                    nodeArr.push(
                                        <td><input
                                            type="checkbox"
                                            data-instrument={instruments[i]}
                                            data-time={j}
                                            key={j}
                                            onChange={this
                                            .toggleCheckboxChange
                                            .bind(this)}/></td>
                                    )
                                }
                                rowArr.push(
                                    <tr>
                                        <td key={i}>{instruments[i]}</td>
                                        {nodeArr}
                                    </tr>
                                );
                                nodeArr = [];
                            }
                            return rowArr;
                        }.bind(this))([], [])}
                    </tbody>
                </table>
                <button
                    onClick={this
                    .handleSubmit
                    .bind(this)}>Play My Song!</button>
            </div>
        );
    }
}
