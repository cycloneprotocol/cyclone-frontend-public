import React, { Component } from "react";
import { css } from '../modules/index'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入柱状图
import 'echarts/lib/chart/bar';
//引入折线图
import 'echarts/lib/chart/line';
// 引入提示框、标题等组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';


class LineChart extends Component {

	constructor(props) {
		super(props);
		let id = ('_' + Math.random()).replace('.', '_');
		this.state = {
			chartId: 'chart' + id,
			boxId: 'chart' + ('_' + Math.random()).replace('.', 'z')
		}
		this.resize.bind(this);
	}

	initChart() {
		let dataX = []
		let dataY = []
		this.props.data.map(item => {
			dataX.push(this.formatDate(item.timestamp))
			dataY.push(Number(item.value))
		})

		// 基于准备好的dom，初始化echarts实例
		let myChart = echarts.init(document.getElementById(this.state.chartId));

		let option = {
			legend: {
				textStyle: {
					color: '#fff',
				},
				right: "5%",
				bottom: "2%",
			},
			grid: {
				top: "2%",
				left: '3%',
				right: '3%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				axisLine: {
					lineStyle: {
						color: '#808eb7',
						width: 2
					}
				},
				data: dataX
			},
			yAxis: {
				axisLine: {
					lineStyle: {
						color: '#eee',
						width: 2
					}
				},
				splitLine: { //分割线配置
					lineStyle: {
						color: "#AAAAAA56",
					}
				},
			},
			series: [
				{
					type: 'line',
					data: dataY
				}
			]
		}
		console.log('inchart', myChart, option)
		// 绘制图表
		myChart.setOption(option);
	}

	initMoreLineChart() {
		let dataX = []
		let dataY1 = []
		let dataY2 = []
		let dataY3 = []
		let legendData = []
		let seriesData = []
		this.props.data.map((item, index) => {
			legendData.push(item.name)
			item.values.map(option => {
				const value = Number(option.value)
				if (index === 0) {
					dataX.push(this.formatDate(option.timestamp))
					dataY1.push(value)
				} else if (index === 1) {
					dataY2.push(value)
				} else if (index === 2) {
					dataY3.push(value)
				}
			})
		})

		const dataY = [dataY1, dataY2, dataY3]

		legendData.map((item, index) => {
			seriesData.push({
				name: item,
				type: 'line',
				data: dataY[index]
			})
		})

		// 基于准备好的dom，初始化echarts实例
		let myChart = echarts.init(document.getElementById(this.state.chartId));
		// 绘制图表
		myChart.setOption({
			tooltip: {},
			legend: {
				textStyle: {
					color: '#fff',
				},
				right: "5%",
				bottom: "2%",
				data: legendData
			},
			grid: {
				top: "2%",
				left: '3%',
				right: '3%',
				bottom: '20%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				axisLine: {
					lineStyle: {
						color: '#808eb7',
						width: 2
					}
				},
				data: dataX
			},
			yAxis: {
				axisLine: {
					lineStyle: {
						color: '#808eb7',
						width: 2
					}
				},
				splitLine: { //分割线配置
					lineStyle: {
						color: "#AAAAAA56",
					}
				},
			},
			series: seriesData
		});
	}

	formatDate(date) {
		var date = new Date(date * 1000);
		var YY = date.getFullYear() + '-';
		var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		return YY + MM + DD;
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize);
		if (this.props.type === 'more') {
			// this.initMoreLineChart(this.state.chartId);
		}
		if (this.props.type === 'one') {
			this.initChart(this.state.chartId);
		}
	}


	resize = () => {
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}

	render() {
		const { title, time, toggleScaleBig, close } = this.props
		return (
			<div className={`${styles.lineChart} lineChartBox`} id={this.state.boxId}>
				<div className={styles.title}>
					<span>{title}</span>
					<img src={close ? "images/close_analysis.png" : "images/scale.png"} onClick={toggleScaleBig} alt="" />
				</div>
				<div className={styles.content}>
					<div id={this.state.chartId} style={{ width: '100%', height: 300 }}></div>
				</div>
				<div className={styles.time}>
					<img src="images/mdi_history.png" alt="" />
					<span>{time}</span>
				</div>
			</div>
		);
	}
};

export default LineChart

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
			margin: '0 auto 24px'
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
			width: "1rem"
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