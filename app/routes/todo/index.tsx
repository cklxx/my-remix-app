import {
	Container,
	Center,
	Space,
	Card,
	Title,
	Text,
	Input,
	SegmentedControl,
} from "@mantine/core";
import { useState } from "react";
import produce from "immer";
import "~/styles/todo.css";

function compTop(idx: number): string {
	return 60 + (idx + 1) * 64 + "px";
}

function computePosition(arr: Array<any>, idx: number) {
	let currentIdx = 0;
	arr.forEach((item) => {
		if (item.idx == idx) {
			currentIdx = item.vid;
		}
	});

	arr = arr.sort((a, b) => {
		return a.vid - b.vid;
	});
	arr = [
		arr[currentIdx],
		...arr.slice(0, currentIdx),
		...arr.slice(currentIdx + 1),
	].map((item, idxx) => {
		item.top = compTop(idxx);
		item.vid = idxx;
		return item;
	});
}

const initTodoList = new Array(100).fill(0).map((_, idx) => ({
	idx,
	vid: idx,
	text: "这是随便一条要做的事情",
	key: idx + "" + idx,
	top: 60 + (idx + 1) * 64 + "px",
}));
export default function Index() {
	const [arr, setArr] = useState(initTodoList);
	const [enableEditIdx, changeEnableEdit] = useState<number>(1);
	const [enable, changeEnable] = useState("enable");
	const onClickWithEnable = (idxp: number, canEdit: boolean) => {
		canEdit
			? changeEnableEdit(idxp)
			: setArr(
					produce((draft) => {
						computePosition(draft, idxp);
					})
			  );
	};

	const onChange = (target: any) => {
		setArr(
			produce((draft) => {
				draft[enableEditIdx].text = target.target.value;
			})
		);
	};
	return (
		<>
			<Title
				order={1}
				align="center"
				style={{ color: "blue", height: 70 }}
			>
				<Text
					sx={{
						"@media (max-width: 500px)": {
							fontSize: "25px",
						},
						"@media (min-width: 500px)": {
							fontSize: "35px",
						},
					}}
					component="span"
					align="center"
					variant="gradient"
					gradient={{ from: "cyan", to: "lime", deg: 45 }}
					size="xl"
					weight={700}
					style={{
						fontFamily: "Greycliff CF, sans-serif",
						margin: "auto",
					}}
				>
					怠做
				</Text>
			</Title>
			<Container padding="xs">
				<Center style={{ margin: "auto" }}>
					<SegmentedControl
						value={enable}
						onChange={changeEnable}
						data={[
							{ label: "编辑", value: "enable" },
							{ label: "排序", value: "not" },
						]}
					/>
				</Center>
			</Container>

			{arr.map((item: any, index) => {
				const canEdit = enable === "enable" && enableEditIdx == index;
				return (
					<Container padding="xs" key={item.key}>
						<Space h="xl" />
						<Center style={{ margin: "auto" }}>
							<Card
								key={item.key}
								sx={{
									"&:hover": {
										backgroundColor: "#eee",
									},
								}}
								className="card"
								style={{
									borderRadius: "8px",
									width: "300px",
									transition: `all 300ms ease`,
									position: "absolute",
									top: item.top,
								}}
								onClick={() => {
									onClickWithEnable(
										item.idx,
										enable === "enable"
									);
								}}
							>
								{canEdit ? (
									<>
										<Input
											value={item.text}
											onChange={onChange}
										></Input>
									</>
								) : (
									<>
										{item.vid} to {item.text} {item.key}
									</>
								)}
							</Card>
						</Center>
					</Container>
				);
			})}
		</>
	);
}
