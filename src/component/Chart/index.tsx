import React from 'react';
import { Polar } from 'react-chartjs-2';
import './chart.css';
import { ICompetence } from 'requests';
interface Props {
  competences?: any;
  parcours: any;
  displayLegend: boolean;
}

interface State {
  data: any;
  options: any;
}

class CompetencesChart extends React.Component<Props, State> {
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.displayLegend !== this.props.displayLegend) {
      this.setState({
        options: {
          legend: {
            position: 'bottom',
            display: nextProps.displayLegend
          },
          responsiveAnimationDuration: 1000,
          maintainAspectRatio: !nextProps.displayLegend,
          startAngle: (-2 * Math.PI) / 3 + 0.52,
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10
            }
          },
          /*
        padding: -50,
        labelOffset: 50, */

          tooltips: {
            mode: 'nearest',
            intersect: true,
            callbacks: {
              label: (tooltipItem: any, data: any) => {
                if (tooltipItem.datasetIndex === 0) {
                  const tooltip = `${data.labels[tooltipItem.index]} : ${data
                    .datasets[0].data[tooltipItem.index] - 1}`;
                  return tooltip;
                }
                const tooltip = `${data.labels[tooltipItem.index]}`;
                return tooltip;
              }
            }
          },

          scale: {
            reverse: true,
            display: true,

            ticks: {
              display: true,

              min: 0,
              max: 5,
              stepSize: 1,
              callback(value: any) {
                if (value !== 1) {
                  return value - 1;
                }
                return '';
              }
            }
          }
        }
      });
    }
  }
  componentDidMount() {
    if (this.props.parcours) {
      const data = Object.assign({}, this.state.data); // creating copy of object
      data.labels = this.props.competences.map(
        (competence: ICompetence) => competence.title
      );

      data.datasets[0].data = this.props.parcours.map((parcour: any) => {
        if (parcour.value !== 0) {
          return parcour.value + 1;
        }
        return parcour.value;
      });
      this.setState({ data });
    }
  }
  state: State = {
    data: {
      datasets: [
        {
          borderColor: 'rgba(255, 0, 0, 0)',
          borderWidth: 0,
          data: [5, 2, 5, 4, 2, 5, 3, 0, 0, 3],
          backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(75,192,192,0.5)',
            'rgba(255,215,0,0.5)',
            'rgba(211,211,211,0.5)',
            'rgba(0, 100, 255, 0.5)',
            'rgba(154, 99, 36, 0.5)',
            'rgba(145, 30, 180, 0.5)',
            'rgba(250, 190, 190, 0.5)',
            'rgba(128, 0, 0, 0.5)',
            'rgba(128, 128, 0, 0.5)'
          ],
          label: 'My dataset' // for legend
        },
        {
          showTooltips: false,
          label: 'Line Dataset',
          data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
            'rgba(75,192,192,0.5)',
            'rgba(255,215,0,0.5)',
            'rgba(211,211,211,0.5)',
            'rgba(0, 100, 255, 0.5)',
            'rgba(154, 99, 36, 0.5)',
            'rgba(145, 30, 180, 0.5)',
            'rgba(250, 190, 190, 0.5)',
            'rgba(128, 0, 0, 0.5)',
            'rgba(128, 128, 0, 0.5)'
          ]
          // Changes this dataset to become a line
          //  type: 'line',
        }
      ],
      labels: []
    },
    options: {
      legend: {
        position: 'bottom',
        display: this.props.displayLegend
      },
      responsiveAnimationDuration: 0,
      maintainAspectRatio: !this.props.displayLegend,
      startAngle: (-2 * Math.PI) / 3 + 0.52,
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      },
      /*
      padding: -50,
      labelOffset: 50, */

      tooltips: {
        mode: 'nearest',
        intersect: true,
        callbacks: {
          label: (tooltipItem: any, data: any) => {
            if (tooltipItem.datasetIndex === 0) {
              const tooltip = `${data.labels[tooltipItem.index]} : ${data
                .datasets[0].data[tooltipItem.index] - 1}`;
              return tooltip;
            }
            const tooltip = `${data.labels[tooltipItem.index]}`;
            return tooltip;
          }
        }
      },

      scale: {
        reverse: true,
        display: true,

        ticks: {
          display: true,

          min: 0,
          max: 5,
          stepSize: 1,
          callback(value: any) {
            if (value !== 1) {
              return value - 1;
            }
            return '';
          }
        }
      }
    }
  };

  public render(): JSX.Element {
    return <Polar data={this.state.data} options={this.state.options} />;
  }
}

export default CompetencesChart;
