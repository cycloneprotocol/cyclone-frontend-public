import React, { Component } from "react";
import { css } from '../modules/index'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


class HighLineChart extends Component {

	constructor(props) {
		super(props);
		let id = ('_' + Math.random()).replace('.', '_');
		this.state = {
			chartId: 'chart' + id,
			chartOptions: {
				chart: {
					backgroundColor: 'transparent',
					type: 'line'
				},
				title: {
					text: null,
				},
				legend: {
					enabled: false,
					align: 'right',
					itemStyle: {
						color: '#fff'
					},
					title: {
						text: null
					}
				},
				xAxis: {
					title: {
						text: null
					},
					labels: {
						style: {
							color: '#ffffff'
						}
					},
					lineColor: '#C4C4C4',
					lineWidth: 0.5,
					categories: [],
				},
				yAxis: {
					title: {
						text: null
					},
					labels: {
						style: {
							color: '#ffffff'
						}
					},
					tickAmount: 8,
					gridLineColor: '#C4C4C4',
					gridLineWidth: 0.5
				},
				series: [
					{ data: [] }
				],
				tooltip: {
					shared: true
				},
				plotOptions: {
					spline: {
						marker: {
							radius: 4,
							lineColor: '#666666',
							lineWidth: 1
						}
					}
				}
			},
			hoverData: null
		};
	}

	setHoverData = (e) => {
		// 图表没有更新，因为 'chartOptions' 没有改变
		this.setState({ hoverData: e.target.category })
	}

	getDataArr = (values, dataX) => {
		if (values.length === dataX.length) {
			return values.reverse().map(item => {
				return Number(item.value)
			})
		}

		let arr = []
		if (values.length < dataX.length) {
			for (let index = 0; index < dataX.length - values.length; index++) {
				arr.push(null)
			}
			values.reverse().map(item => {
				arr.push(Number(item.value))
			})
			return arr
		}
	}

	componentDidMount() {
		if (this.props.type === 'more') {
			let dataX = []
			let legendData = []
			let seriesData = []
			this.props.data.map((item, index) => {
				legendData.push(item.name)
				item.values.map(option => {
					if (index === 0) {
						dataX.push(this.formatDate(option.timestamp))
					}
				})
			})

			const colors = ['#16467E', '#400E72', '#825015', '#A8DC38', '#38DCD5', '#646AFF', '#E374FF']

			legendData.map((item, index) => {
				seriesData.push({
					name: item,
					type: 'line',
					data: this.getDataArr(this.props.data[index].values, dataX),
					color: colors[index]
				})
			})

			this.setState({
				chartOptions: {
					legend: {
						enabled: true,
					},
					xAxis: {
						categories: dataX.reverse(),
					},
					series: seriesData
				}
			});
		}

		if (this.props.type === 'one') {
			let dataX = []
			let dataY = []
			this.props.data.map(item => {
				dataX.push(this.formatDate(item.timestamp))
				dataY.push(Number(item.value))
			})
			this.setState({
				chartOptions: {
					tooltip: {
						headerFormat: '{point.x}<br/>',
						pointFormat: '<b>{point.y}</b>'
					},
					xAxis: {
						categories: dataX,
					},
					series: [
						{ data: dataY, color: '#FFD600' }
					]
				}
			});
		}

	}


	updateSeries = () => {
		// 图表只使用新配置选项进行更新
		this.setState({
			chartOptions: {
				series: [
					{ data: [Math.random() * 5, 2, 1] }
				]
			}
		});
	}


	formatDate(date) {
		var date = new Date(date * 1000);
		var YY = date.getFullYear() + '-';
		var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		return YY + MM + DD;
	}


	render() {
		const { chartOptions } = this.state;
		const { title, time, toggleScaleBig, close } = this.props
		return (
			<div className={`${styles.lineChart.className} lineChartBox`}>
				<div className={styles.title.className}>
					<span>{title}</span>
					<img src={close ? "images/close_analysis.png" : "images/scale.png"} onClick={toggleScaleBig} alt="" />
				</div>
				<div className={styles.content.className}>
					<HighchartsReact
						highcharts={Highcharts}
						options={chartOptions}
					/>
				</div>
				<div className={styles.time.className}>
					<img src="images/mdi_history.png" alt="" />
					<span>{time}</span>
				</div>
			</div>
		);
	}
};

export default HighLineChart

const styles = {
	lineChart: css({
		width: "100%",
		border: "1px solid #38DCD5",
		boxSizing: "border-box",
		padding: "16px",
		width: '100%',
		marginBottom: '24px',
		'@md': {
			maxWidth: '49%',
		}
	}),
	title: css({
		marginBottom: "2rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		span: {
			fontSize: "1.125rem",
			fontWeight: "bold",
		},
		img: {
			width: "1rem",
			cursor: 'pointer'
		}
	}),
	content: css({
		textAlign: "center",
		div: {
			"&:nth-child(1)": {
				color: "#38DCD5",
				fontSize: "2.5rem"
			},
			"&:nth-child(2)": {
				color: "#ffffff",
				fontSize: "1.125rem",
				fontWeight: "normal",
				letterSpacing: "1px"
			}
		},
    ".highcharts-container": {
      width: '100% !important'
    }
	}),
	time: css({
		display: "flex",
		alignItems: "center",
		marginTop: "1rem",
		img: {
			width: "1.5rem",
			marginRight: 5
		},
		span: {
			fontSize: "0.75rem"
		}
	})
}