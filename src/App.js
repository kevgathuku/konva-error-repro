import React, { Component } from "react";
import { Layer, Stage, Line } from "react-konva";
import KonvaLine from "./KonvaLine";

class App extends Component {
    constructor(props) {
        super(props);
        this.initialFigure = {
            id: Math.random(),
            x: 0,
            x1: 0,
            y: 0,
            y1: 0
        };

        this.state = {
            listenForMouseMove: false,
            figure: this.initialFigure
        };
    }

    onMouseDown = evt => {
        debugger;
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
            this.setState(prevState => ({
                listenForMouseMove: false,
                figure: null
            }));
        }
    };

    renderFigureOnCanvas = figure => {
        if (!figure || !figure.type) return null;

        console.log("Figure", figure);

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
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}
                    listening
                >
                    <Layer listening>
                        {this.state.figure.type ? (
                            this.renderFigureOnCanvas(this.state.figure)
                        ) : null}
                        <Line
                            points={[10, 10, 50, 50]}
                            stroke="blue"
                            strokeWidth={5}
                            lineCap="round"
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default App;
