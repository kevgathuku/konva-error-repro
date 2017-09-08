import React, { Component } from "react";
import { Line } from "react-konva";

export default class KonvaLine extends Component {
    render() {
        const { x, y, x1, y1 } = this.props.figure;

        return (
            <Line
                points={[x, y, x1, y1]}
                stroke="blue"
                strokeWidth={5}
                lineCap="round"
                draggable
            />
        );
    }
}
