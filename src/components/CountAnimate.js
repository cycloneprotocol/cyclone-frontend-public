import React, { useEffect } from "react";
import { useCountUp } from "react-countup";
import { css } from '../modules/index'



export const CountAnimate = (props) => {
	const { value, decimals = 0, tips, time, unit, hideTip } = props;
	const { countUp, update } = useCountUp({
		start: 0,
		end: value,
		delay: 0,
		duration: 5,
		decimals,
	});

	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	useEffect(() => {
		update(value);
	}, [value]);

	return (
		<div className={styles.countAnimate.className}>
			<div className={styles.title.className}>{tips}</div>
			<div className={styles.content.className}>
				<div>{decimals === 0 ? numberWithCommas(countUp) : countUp || 0}{unit}</div>
				{!hideTip && <div>{tips ? tips : ""}</div>}
			</div>
			<div className={styles.time.className}>
				<img src="images/mdi_history.png" alt="" />
				<span>{time}</span>
			</div>
		</div>
	);
};

const styles = {
	countAnimate: css({
		width: "100%",
		border: "1px solid #38DCD5",
		boxSizing: "border-box",
		padding: "16px",
		marginBottom: '24px',
		width: '100%',
		'@md': {
			maxWidth: '19%'
		}
	}),
	title: css({
		fontSize: "0.875rem",
		fontWeight: "bold",
		marginBottom: "2rem",
	}),
	content: css({
		textAlign: "center",
		div: {
			"&:nth-child(1)": {
				color: "#38DCD5",
				fontSize: "2.2rem"
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
		marginTop: "2rem",
		img: {
			width: "1.5rem",
			marginRight: 5
		},
		span: {
			fontSize: "0.75rem"
		}
	})
}