import { useEffect, useRef, useState } from "react";
import produce from "immer";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
// type ECOption = echarts.ComposeOption<BarSeriesOption
// | LineSeriesOption
// | TitleComponentOption
// | TooltipComponentOption
// | GridComponentOption
// | DatasetComponentOption
// | LineSeriesOption
// >;

/**
 * App two numbers together.
 * @return {JSX.Element}
 */
function App() {
	const initOptions = {
		title: {
			text: "ECharts 入门示例",
		},
		xAxis: {
			type: "category",
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: "line",
				smooth: true,
			},
		],
	};
	const echartRef = useRef<any>(null);
	const [op, setOp] = useState(initOptions);
	useEffect(() => {
		const echarts = require("echarts/core");
		const { BarChart, LineChart } = require("echarts/charts");
		const {
			TitleComponent,
			TooltipComponent,
			GridComponent,
			// 数据集组件
			DatasetComponent,
			// 内置数据转换器组件 (filter, sort)
			TransformComponent,
		} = require("echarts/components");
		const {
			LabelLayout,
			UniversalTransition,
		} = require("echarts/features");
		const { CanvasRenderer } = require("echarts/renderers");
		// 注册必须的组件
		echarts.use([
			TitleComponent,
			TooltipComponent,
			GridComponent,
			DatasetComponent,
			TransformComponent,
			BarChart,
			LineChart,
			LabelLayout,
			UniversalTransition,
			CanvasRenderer,
		]);
		const ele = document.getElementById("echarts");
		if (ele) {
			const chartInstance = echarts.init(ele);
			echartRef.current = chartInstance;
			chartInstance.setOption(op);
		}
		setTimeout(() => {
			setOp(
				produce((draft) => {
					draft.title.text = "换一换实时";
					draft.series.push({
						data: [1820, 1932, 101, 1934, 290, 330, 320],
						type: "line",
						smooth: true,
					});
				})
			);
		}, 1000);
	}, []);
	useEffect(() => {
		echartRef.current.setOption(op);
	}, [op]);
	return (
		<div className="charts"  style={{width: '700px', height: '500px',textAlign:"center"}}>
			<div id="echarts" style={{ width: "600px", height: "400px" }} />
		</div>
	);
}

export default App;
