import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default class SizeChart extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/90v76x08/";

  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={this.props.chartData.sizes}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="minified" stackId="a" fill="#8884d8" />
        <Bar dataKey="gzipped" stackId="a" fill="#82ca9d" />
      </BarChart>
    );
  }
}
