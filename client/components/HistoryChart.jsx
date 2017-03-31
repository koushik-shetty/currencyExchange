import React, { Component } from 'react';
import Rickshaw from 'rickshaw';

export default class HistoryChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            changed: true,
        };
    }

    _setupGraph() {
        this.graph = new Rickshaw.Graph({
            element: document.querySelector('#history-graph'),
            renderer: 'line',
            series: [
                {
                    color: 'steelblue',
                    data: this.state.data,
                }
            ],
        });
        this.graph.render();
    }


    componentWillReceiveProps(nextProps) {
        const same = JSON.stringify(nextProps.data) === JSON.stringify(this.state.data);
        if (!same) {
            this.setState({
                data: nextProps.data,
                changed: !same,
            });
        }
    }

    componentDidMount() {
        this._setupGraph();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.changed) {
            this._renderGraph(this.state.data);
        }
    }

    _renderGraph(data) {
        //graph.configure does not seem to work. [https://github.com/shutterstock/rickshaw/issues/135]
        this.graph.series[0].data = data;
        this.graph.update();
    }

    render() {
        return (
            <div style={{ width: 500, height: 500 }}>
                <div id='history-graph' style={{ width: 500, height: 500 }}></div>
                <div id='legend'></div>
                <div id=''></div>
            </div>
        );
    }
}

HistoryChart.defaultProps = {
    data: [],
};