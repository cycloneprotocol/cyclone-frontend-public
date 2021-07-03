import React, { useEffect, useMemo } from 'react';
import Button from './Button';
import { css } from '../modules/index';
import { useStore } from '../store';
import { observer, useLocalStore } from 'mobx-react-lite';
import ReactTooltip from 'react-tooltip';
import God from '../God';
import BigNumber from 'bignumber.js';
import EthereumConfig from '../EthereumConfig';

export const DepositViewForETH = observer(props => {
	const { lang } = useStore();
	const store = useLocalStore(() => ({
		tokens: null,
		indexOfToken: 0,
		// indexOfAmountSet: 0,
		indexOfPool: 0,
		currentAmount: -1,
		currentCYCDenomination: 0,
		currentCYCDenominationLabel: '...',
		poolSize: -1,
		init(chainID, isConnected) {
			store.tokens = EthereumConfig.tokensOnEthereum[chainID].tokens;

			if (isConnected) {
				store.getCurrentAmount();
				store.getPoolSize();
				store.getCurrentCYCDenomination();
			}
		},
		onSelectAmount(id) {
			// store.indexOfAmountSet = id;
			props.onSelectAmount(id);
		},

		onSelectToken(event) {
			const idx = event.target.value;
			store.indexOfToken = idx;
			props.onSelectToken(idx);
		},

		onSelectPool(index) {
			const tempInt = index;
			store.indexOfPool = tempInt;
			props.onSelectAmount(tempInt);
			store.fetchData();
		},

		async fetchData() {
			await Promise.all([store.getCurrentAmount(), store.getPoolSize()]);
		},

		onConnect() {
			if (props.onConnect) {
				props.onConnect();
			}
		},

		// onSelectPool(event) {
		//   const tempInt = event.target.value;
		//   store.indexOfPool = tempInt;
		//   props.onSelectAmount(tempInt);
		// },

		async deposit() {
			let set = store.tokens[store.indexOfToken].amountSteps[store.indexOfPool];

			if (this.currentAmount === 0) {
				const abi = await God.asyncGetABI(set.abi);
				store.currentAmount = await God.asyncGetDepositDenomination(set.address, abi);
			}

			if (set.address && store.currentAmount) {
				props.onDeposit(set.address, store.currentAmount, store.currentCYCDenomination);
			}
		},

		async getCurrentAmount() {
			store.currentAmount = -1;

			if (!store.tokens) {
				return;
			}

			const set = store.tokens[store.indexOfToken].amountSteps[store.indexOfPool];
			const abi = await God.asyncGetABI(set.abi);
			store.currentAmount = await God.asyncGetDepositDenomination(set.address, abi);
		},

		async getCurrentCYCDenomination() {
			store.currentCYCDenomination = -1;

			if (!store.tokens) {
				return;
			}

			const set = store.tokens[store.indexOfToken].amountSteps[store.indexOfPool];
			const abi = await God.asyncGetABI(set.abi);
			store.currentCYCDenomination = await God.asyncGetCYCDenomination(set.address, abi);
			store.currentCYCDenominationLabel = new BigNumber(store.currentCYCDenomination)
				.dividedBy(new BigNumber(10).pow(18))
				.toFixed(6)
				.toString();
		},

		async getPoolSize() {
			store.poolSize = -1;
			if (store.tokens) {
				store.poolSize = await God.asyncGetEthereumBalance(
					store.tokens[store.indexOfToken].amountSteps[store.indexOfPool].address
				);
			}
		}
	}));

	const ActionButton = useMemo(() => {
		if (!props.isAvaliable) {
			return <Button avaliable={true} label={lang.t('connect')} onClick={store.onConnect} />;
		}
		return (
			<Button
				label={lang.t('Deposit')}
				avaliable={
					!props.isAvaliable ||
						!store.tokens ||
						store.tokens[store.indexOfToken].amountSteps[store.indexOfPool].address === ''
						? false
						: true
				}
				onClick={store.deposit}
			/>
		);
	}, [props.isAvaliable, store.indexOfToken, store.indexOfPool, store.tokens]);

	useEffect(() => {
		store.init(props.chainID, props.isAvaliable);
	}, []);

	useEffect(() => {
		store.init(props.chainID, props.isAvaliable);
	}, [props.chainID, props.isAvaliable]);

	return (
		<div className={styles.depositView}>
			<div className={styles.token}>
				<div className="header">{lang.t('token')}</div>
				<div>
					<select onChange={store.onSelectToken} className="select">
						{store.tokens &&
							store.tokens.map((item, index) => (
								<option key={index} value={index}>
									{item.name}
								</option>
							))}
					</select>
				</div>
			</div>

			<div className={styles.token}>
				<div className="header">
					{lang.t('Pool')}
					<span className="tooltip" data-tip="pool-tips" data-for="pool-tips">
						i
          </span>
				</div>
				<ReactTooltip place="right" type="warning" id="pool-tips" effect="solid" backgroundColor="#45bcb8">
					<div style={{ textAlign: 'center', fontWeight: 'bold', maxWidth: '12rem' }}>{lang.t('Pool.tips')}</div>
				</ReactTooltip>
				<div className={styles.poolAudio}>
					<ul>
						{store.tokens &&
							store.tokens[store.indexOfToken].amountSteps.map((item, index) => (
								<li
									key={index}
									data={index}
									className={store.indexOfPool === index ? 'active' : ''}
									onClick={() => store.onSelectPool(index)}
								>
									{item.set}
								</li>
							))}
					</ul>
				</div>
				<div className={styles.poolInfos}>
					<div className="address">
						{/* {lang.t('Address')}: {store.tokens && store.tokens[store.indexOfToken].amountSteps[store.indexOfPool]['address']} */}
						{lang.t('Address')}:{' '}
						<a href="https://github.com/cycloneprotocol/cyclone-contracts/tree/v2.0" target="_blank">
							2.0
            </a>
					</div>
					<div className="perShare">
						{lang.t('Denomination')}:{' '}
						{store.currentAmount > 0
							? new BigNumber(store.currentAmount)
								.dividedBy(new BigNumber(10).pow(18))
								.toFixed(4)
								.toString()
							: '...'}
            &nbsp;{store.tokens ? store.tokens[store.indexOfToken].name : ''}
					</div>
					<div className="perShare">CYC Denomination:&nbsp;{store.currentCYCDenominationLabel}</div>
					<div className="perShare">
						{lang.t('pool.size')}:{' '}
						{store.poolSize > -1
							? new BigNumber(store.poolSize)
								.dividedBy(new BigNumber(10).pow(18))
								.toFixed(4)
								.toString()
							: '...'}
            &nbsp;{store.tokens ? store.tokens[store.indexOfToken].name : ''}
					</div>
				</div>
			</div>
			<div className={styles.buttonPanel}>{ActionButton}</div>
		</div>
	);
});

const styles = {
	depositView: css({
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		height: '530',
		'@md': {
			minHeight: '390px'
		}
	}),
	token: css({
		marginTop: '1.2rem',
		marginLeft: '7vw',
		'@xs': {
			marginTop: '25px',
			marginLeft: '40px'
		},
		'.select': {
			border: '1px solid #45BCB8',
			color: 'white',
			background: 'transparent',
			height: '40px',
			width: '95%',
			appearance: 'none',
			fontSize: '18px',
			fontFamily: "'IBM Plex Mono', monospace",
			paddingLeft: '0.5rem'
		}
	}),
	amount: css({
		width: '95%',
		overflow: 'hidden',
		marginTop: '2rem',
		marginLeft: '7vw',
		marginBottom: '2rem',
		'@xs': {
			width: '94%',
			overflow: 'auto',
			marginLeft: '40px',
			paddingRight: '40px'
		},
		'.stepperTrack': {
			width: '100%',
			borderWidth: '2px',
			borderStyle: 'solid',
			borderColor: '#45bcb8',
			marginTop: '20px'
		}
	}),
	buttonPanel: css({
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '1.28rem',
		marginTop: '1rem',
		paddingLeft: '8%',
		boxSizing: 'border-box',
		'.button': {
			width: '50%',
			height: '40px',
			lineHeight: '40px',
			display: 'flex',
			justifyContent: 'center',
			backgroundColor: '#45BCB8',
			color: 'white',
			fontSize: '1rem',
			fontWeight: 'bold',
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: '#24928E'
			}
		}
	}),
	bottomTips: css({
		marginLeft: '10%',
		marginRight: '4vw',
		fontSize: '12px',
		padding: '0 0 0.3rem 3rem',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		'@md': {
			marginLeft: '64px',
			marginRight: '28px',
			fontSize: '12px',
			paddingLeft: '40px',
			paddingBottom: '0.35rem',
			whiteSpace: 'nowrap'
		}
	}),
	poolInfos: css({
		'.address, .perShare': {
			wordBreak: 'break-all',
			width: '95%',
			marginTop: '0.7rem',
			fontSize: '12px',
			marginBottom: 0
		},
		'.perShare': {
			marginTop: '0.3rem'
		}
	}),
	poolAudio: css({
		paddingRight: '5%',
		ul: {
			listStyleType: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			flexWrap: 'wrap',
			padding: 0,
			margin: 0,
			li: {
				width: '100%',
				padding: '4px 0',
				border: '1px solid #45BCB8',
				textAlign: 'left',
				marginBottom: '8px',
				paddingLeft: '4px',
				fontSize: '0.875rem',
				cursor: 'pointer',
				'@md': {
					width: '48%'
				},
				'&:hover': {
					background: 'rgba(69, 188, 184, 0.35)'
				}
			},
			'.active': {
				fontWeight: 'bold',
				color: '#38DCD5',
				borderColor: '#45BCB8',
				background: 'rgba(69, 188, 184, 0.35)'
			}
		}
	})
};

export default DepositViewForETH;
