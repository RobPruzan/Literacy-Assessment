import Plot from 'react-plotly.js';
export type Data = {
  x: number[];
  y: number[];
};

export type ChartProps = {
  data?: Data;
};
export const Chart = ({ data }: ChartProps) => {
  return (
    <Plot
      data={[
        {
          ...data,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ]}
      layout={{
        yaxis: { side: 'right' },
        width: 500,
        height: 500,
        title: 'Text Difficulty',
      }}
    />
  );
};
