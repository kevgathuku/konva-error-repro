import React, { Component } from "react";
import { Layer, Stage } from "react-konva";
import KonvaLine from "./KonvaLine";

class App extends Component {
    constructor(props) {
        super(props);
        this.initialFigure = {
            id: `${Math.random()}-${Math.random()}`,
            x: 0,
            x1: 0,
            y: 0,
            y1: 0
        };

        this.drawnFigures = [
            {
                id: `${Math.random()}-${Math.random()}`,
                x: 10,
                x1: 50,
                y: 10,
                y1: 50,
                type: "line"
            }
        ];

        this.state = {
            listenForMouseMove: false,
            figure: this.initialFigure
        };
    }

    addFigure = figure => {
        if (!figure.id) figure.id = `${Math.random()}-${Math.random()}`;
        this.drawnFigures.push(figure);
    };

    onMouseDown = evt => {
        console.log("onMouseDown evt", evt);
        const { evt: { offsetX, offsetY } } = evt;

        this.setState({
            listenForMouseMove: true,
            figure: {
                draggable: false,
                type: "line",
                x: offsetX,
                y: offsetY
            }
        });
    };

    onMouseMove = evt => {
        console.log("onMouseMove");
        const { listenForMouseMove } = this.state;

        if (!listenForMouseMove) return;

        const { evt: { offsetX, offsetY } } = evt;

        this.setState(prevState => ({
            ...prevState,
            figure: {
                ...prevState.figure,
                x1: offsetX,
                y1: offsetY
            }
        }));
    };

    onMouseUp = evt => {
        console.log("onMouseUp");
        const { listenForMouseMove } = this.state;

        if (listenForMouseMove) {
            this.addFigure(this.state.figure);
            this.setState(prevState => ({
                listenForMouseMove: false,
                figure: null
            }));
        }
    };

    renderFigureOnCanvas = figure => {
        if (!figure || !figure.type) return null;

        switch (figure.type) {
            case "line":
                return <KonvaLine figure={figure} key={figure.id} />;

            default:
                return null;
        }
    };

    render() {
        return (
            <div className="canvas-container">
                <Stage
                    width={600}
                    height={600}
                    onContentMousedown={this.onMouseDown}
                    onContentMouseMove={this.onMouseMove}
                    onContentMouseUp={this.onMouseUp}
                    listening
                >
                    <Layer listening>
                        {this.drawnFigures.map(this.renderFigureOnCanvas)}
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default App;
