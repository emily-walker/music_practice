import React, {Component} from 'react';

// App component - represents the whole app
export default class App extends Component {

    constructor(props) {
        super(props);
        this.selectedCheckboxes = [];
        this.song = {
            organ: [
                false, false, false, false
            ],
            clap: [
                false, false, false, false
            ],
            cymbal: [false, false, false, false]
        };
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
        while (Date.now() - started <= 4000) {
            if (Math.floor((Date.now() - started) / 1000) > currentSecond) {
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
    }

    playInstrument(instrument) {
        console.log(instrument);
        this
            .instruments[instrument]
            .audio
            .play();
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Click a button to start :)</h1>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>0</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Organ</td>
                            <td><input
                                type="checkbox"
                                data-instrument="organ"
                                data-time="0"
                                id="organ0"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="organ"
                                data-time="1"
                                id="organ1"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="organ"
                                data-time="2"
                                id="organ2"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="organ"
                                data-time="3"
                                id="organ3"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                        </tr>
                        <tr>
                            <td>Clap</td>
                            <td><input
                                type="checkbox"
                                data-instrument="clap"
                                data-time="0"
                                id="clap0"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="clap"
                                data-time="1"
                                id="clap1"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="clap"
                                data-time="2"
                                id="clap2"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="clap"
                                data-time="3"
                                id="clap3"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                        </tr>
                        <tr>
                            <td>Cymbal</td>
                            <td><input
                                type="checkbox"
                                data-instrument="cymbal"
                                data-time="0"
                                id="cymbal0"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="cymbal"
                                data-time="1"
                                id="cymbal1"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="cymbal"
                                data-time="2"
                                id="cymbal2"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                            <td><input
                                type="checkbox"
                                data-instrument="cymbal"
                                data-time="3"
                                id="cymbal3"
                                onChange={this
                .toggleCheckboxChange
                .bind(this)}/></td>
                        </tr>
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
