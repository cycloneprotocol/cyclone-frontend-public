import BigNumber from 'bignumber.js';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import God from '../God';
import Button from './Button';
import TextButton from './TextButton';
import { css } from '../modules/index';
import { useStore } from '../store';
import { observer, useLocalStore } from 'mobx-react-lite';
import EthereumConfig from '../EthereumConfig';

const rawUnit = new BigNumber(10).pow(EthereumConfig.tokensOnEthereum[God.chainID].LPToken.decimals);

export const LiquidtyViewForETH = observer((props) => {
	const { lang, eth: pageStore } = useStore();

	const store = useLocalStore(() => ({
		balance: 0,
		staked: -1,
		toStake: 0,
		toUnstake: 0,
		allowance: 0,
		// isStaked: false,
		// lpTokens: [],
		// valuesOfToken: [],
		valuesOfToken: {},
		price: [1.0],
		cycBalance: -1,
		LPTokenBalance: -1,
		APY: -1,
		theStakeInput: null,
		theUnstakeInput: null,
		rewardDaily: null,

		async test() { },
		async computeRewardDaily() {
			const rewardPerBlock = await God.asyncGetRewardPerBlock();
			const rewardDaily = new BigNumber(rewardPerBlock).multipliedBy(86400 / 5).dividedBy(1e18);
			this.rewardDaily = rewardDaily;
		},
		// async computeRewardDaily() {
		//   this.rewardDaily = 0;

		//   const logs = await God.getRewardAddedLogs();
		//   const today = new Date();
		//   let eventTime = null;
		//   let sum = new BigNumber(0);
		//   for (let log of logs) {
		//     eventTime = new Date(log.timestamp);
		//     if (
		//       eventTime.getFullYear() === today.getFullYear() &&
		//       eventTime.getMonth() === today.getMonth() &&
		//       eventTime.getDate() === today.getDate()
		//     ) {
		//       sum = new BigNumber(log.amount).plus(sum);
		//     }
		//   }

		//   this.rewardDaily = sum.dividedBy(1e18);
		// },

		async calculateAPY() {
			// Versiun 1.0
			// if (store.staked === 0) {
			//   return;
			// }
			// const totalStaked = await God.asyncGetTotalSupplyByIndexOfLPToken(0);
			// const earnedDaily = new BigNumber(store.staked).multipliedBy(25).dividedBy(totalStaked);
			// store.APY = earnedDaily.dividedBy(store.staked).multipliedBy(365).multipliedBy(100).toFixed(4);
			// Result: 0% when store.statke == 0

			// Version 2.0
			// const totalCyc = await God.asyncGetTotalSupplyOfMimo()
			// const totalLPToken = await God.asyncGetTotalSupplyByIndexOfLPToken(0);
			// store.APY = (25 / (totalCyc / totalLPToken * totalLPToken) / 2 * 100).toFixed(4) // Result = 1.77%
			// // store.APY = (25 / (totalCyc / totalLPToken * store.staked) / 2 * 100).toFixed(4) // Result = Infinity

			// Version 3.0
			const [totalCyc, totalLPToken] = await Promise.all([
				God.asyncGetTotalSupplyOfMimo(),
				God.asyncGetTotalSupplyByIndexOfLPToken(0),
			]);
			store.APY = ((25 / totalCyc / totalLPToken) * 365 * 100).toFixed(2);
			// Result: 144%
		},

		async getLPTokens() {
			// const lpTokens = await God.asyncGetPools();
			// if (lpTokens.length > 0) {
			//   store.lpTokens = lpTokens;

			//   setTimeout(() => {
			//     store.getValuesOfToken();
			//   }, 100);
			// }
			store.getValuesOfToken();
		},

		async getLPTokenBalance() {
			const abi = await God.asyncGetABI(pageStore.CurrentNetwork.uniswapPair.abi);
			store.LPTokenBalance = new BigNumber(await God.asyncGetBalanceOf(pageStore.CurrentNetwork.uniswapPair.address, abi))
				.dividedBy(rawUnit)
				.toFixed(6);
		},

		async getValuesOfToken() {
			// let tempArray = [];
			let APY;
			let tokenName;
			let earned;
			let balance;
			let staked;
			let valueStaked;
			let allowance;
			// for (let i = 0; i < store.lpTokens.length; i++) {
			//   const res = await Promise.all([
			//     God.asyncGetTokenNameByAddress(store.lpTokens[i]),
			//     God.asyncGetEarnedByIndexOfLPToken(i),
			//     God.asyncGetBalanceByIndexOfLPToken(i),
			//     God.asyncGetAllowanceByIndexOfLPToken(i),
			//     God.asyncGetStakedByIndexOfLPToken(i),
			//   ]);
			//   tokenName = res[0];
			//   earned = Number(res[1]);
			//   balance = Number(res[2]);
			//   allowance = Number(res[3]);
			//   staked = Number(res[4]);
			//   APY = 0;
			//   valueStaked = staked * store.price[i];

			//   if (i === 0) {
			//     store.balance = balance;
			//     store.staked = staked;
			//     store.allowance = allowance;
			//   }

			//   tempArray.push({
			//     APY: APY,
			//     tokenName: tokenName,
			//     earned: earned,
			//     balance: balance,
			//     staked: staked,
			//     valueStaked: valueStaked,
			//   });
			// }
			// store.valuesOfToken = tempArray;
			const res = await Promise.all([
				God.asyncGetTokenNameByAddress(pageStore.CurrentNetwork.CYCToken.address),
				God.asyncGetEarnedByIndexOfLPToken(0),
				God.asyncGetBalanceByIndexOfLPToken(0),
				God.asyncGetAllowanceByIndexOfLPToken(0),
				God.asyncGetStakedByIndexOfLPToken(0),
			]);

			tokenName = res[0];
			earned = Number(res[1]);
			balance = Number(res[2]);
			allowance = Number(res[3]);
			staked = Number(res[4][0]);

			APY = 0;
			valueStaked = staked * store.price[0];

			store.balance = balance;
			store.staked = staked;
			store.allowance = allowance;

			store.valuesOfToken.APY = APY;
			store.valuesOfToken.tokenName = tokenName;
			store.valuesOfToken.earned = earned;
			store.valuesOfToken.balance = balance;
			store.valuesOfToken.staked = staked;
			store.valuesOfToken.valueStaked = valueStaked;

			setTimeout(() => {
				store.calculateAPY();
			}, 3000);
		},

		onChangeStake(event) {
			let tempInt = Number(event.target.value);
			if (!tempInt) {
				tempInt = 0;
			}

			if (tempInt > store.LPTokenBalance) {
				return;
			}
			store.toStake = tempInt;
		},

		onChangeUnstake(event) {
			let tempInt = Number(event.target.value);
			if (!tempInt) {
				tempInt = 0;
			}

			if (tempInt > store.staked) {
				return;
			}

			store.toUnstake = tempInt;
		},

		async onClickStake(event) {
			const tokenABI = await God.asyncGetABI(pageStore.CurrentNetwork.CYCToken.abi);
			props.stake(
				new BigNumber(store.toStake).multipliedBy(rawUnit).toString(),
				pageStore.CurrentNetwork.CYCToken.address,
				tokenABI,
				{ allowance: new BigNumber(store.allowance).multipliedBy(1e18).toString() }
			);
		},

		formatToken(amount, decimals) {
			return new BigNumber(amount).dividedBy(Math.pow(10, decimals ? decimals : 18)).toString();
		},

		async onClickUnstake(event) {
			const abi = await God.asyncGetABI(pageStore.CurrentNetwork.Aeolus.abi);
			God.unstake(
				pageStore.CurrentNetwork.Aeolus.address,
				abi,
				{
					_pid: 0,
					_amount: new BigNumber(store.toUnstake).multipliedBy(1e18).toString(),
				},
				(result) => {
					props.unstake(result);
				}
			);
		},

		setMaxStakeValue() {
			if (store.theStakeInput) {
				store.theStakeInput.value = store.LPTokenBalance;
			}
			store.toStake = store.LPTokenBalance;
		},

		setMaxUnstakeValue() {
			if (store.theUnstakeInput) {
				store.theUnstakeInput.value = store.staked;
			}

			store.toUnstake = store.staked;
		},

		claim() {
			God.claim((result) => {
				if (result) {
					store.getLPTokens();
				}
			});
		},

		async getCYCBalance() {
			const abi = await God.asyncGetABI(pageStore.CurrentNetwork.CYCToken.abi);
			const balance = await God.asyncGetBalanceOf(pageStore.CurrentNetwork.CYCToken.address, abi);
			store.cycBalance = new BigNumber(balance).dividedBy(1e18).toFixed(9).toString();
		},
	}));

	useEffect(() => {
		if (!props.isAvailable) {
			props.connect()
		}
	}, []);

	useEffect(() => {
		if (props.isAvailable) {
			Promise.all([
				store.getLPTokens(),
				store.getCYCBalance(),
				store.getLPTokenBalance(),
				store.computeRewardDaily(),
			]);
		}
	}, [props.chainID, props.isAvailable])

	return (
		<div className="borderedView">
			<div className="checkNoteView">
				<div className="titleOfView" style={{ padding: '1rem' }}>
					<div className={styles.titleOfViewLeft}>
						<div className="td" style={{ fontWeight: 'bold', minWidth: '100px' }}>
							{lang.t('cyc.lp.mining.title')}
						</div>
						<div className="td" style={{ minWidth: '150px' }}>
							{lang.t('total.apy')}: {store.APY == -1 ? '...' : `${store.APY}%`}
						</div>
						<div className="td" style={{ minWidth: '180px' }}>
							{lang.t('balance')}: {store.cycBalance == -1 ? '...' : new BigNumber(store.cycBalance).toFixed(4)} CYC
            </div>
						<div className="td" style={{ minWidth: '180px' }}>
							{lang.t('earned')}:{' '}
							{store.valuesOfToken ? new BigNumber(store.valuesOfToken.earned).toFixed(6) : '...'} CYC
            </div>
						<div className="td">
							<Button
								width="60px"
								height="25px"
								fontSize="14px"
								fullWidth={false}
								avaliable={true}
								onClick={store.claim}
								label={lang.t('claim')}
							/>
						</div>
					</div>

					<button onClick={props.onClickCloseButton} className="imageButton">
						<img src="images/close.svg" width="16px" height="16px" alt="" />
					</button>
				</div>

				<div className="bodyOfView">
					<div className={styles.bodyOfViewTop}>
						<div>
							{lang.t('cyc.eth.pool.token')}
							<ReactTooltip id="ff" place="top" type="warning" effect="solid" backgroundColor="#45bcb8">
								<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
									{lang.t('cyc.obtained')}
									<br />
									{lang.t('by.adding')} <a href="https://app.uniswap.org">uniswap</a>
								</div>
							</ReactTooltip>
						</div>
						<div>
							{/* <a href="https://mimo.exchange/pool" target="_blank">Add Liquidity</a> */}
							<Button
								width="130px"
								height="25px"
								fontSize="14px"
								fullWidth={false}
								avaliable={true}
								href={pageStore.CurrentNetwork.uniswapURL + pageStore.CurrentNetwork.CYCToken.address}
								label={lang.t('add.liquidity')}
							/>
						</div>
					</div>
					<div>
						{lang.t('mining.reward.today')}:&nbsp;
            {store.rewardDaily ? (store.rewardDaily.comparedTo('0') === 0 ? 0 : store.rewardDaily.toFixed(6)) : '...'}
            &nbsp;CYC
          </div>
					<div className={styles.bodyOfViewBottom}>
						<div className={styles.bodyOfViewInputs}>
							<div className={styles.buttonGroupItem}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}
								>
									<div>
										{lang.t('balance')}: {store.LPTokenBalance == -1 ? '...' : store.LPTokenBalance} CYC
                  </div>
								</div>

								<div style={{
									position: 'relative'
								}}>
									<input
										className="input"
										ref={(node) => (store.theStakeInput = node)}
										onChange={store.onChangeStake}
										min={0}
										max={store.LPTokenBalance}
										type="number"
									/>
									{store.LPTokenBalance > 0 && (
										<div style={{
											position: 'absolute',
											right: '10px',
											top: 8
										}}>
											<TextButton onClick={store.setMaxStakeValue} text={lang.t('Max')} />
										</div>
									)}
								</div>


								<div style={{ marginTop: '20px' }}>
									<Button
										fullWidth={true}
										avaliable={store.toStake > 0}
										onClick={store.onClickStake}
										label={lang.t('STAKE')}
									/>
								</div>
							</div>

							<div className={styles.buttonGroupItem}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}
								>
									<div>Staked: {store.staked == -1 ? '...' : new BigNumber(store.staked).toFixed(6)} CYC</div>

								</div>

								<div style={{ position: 'relative' }}>
									<input
										className="input"
										ref={(node) => (store.theUnstakeInput = node)}
										onChange={store.onChangeUnstake}
										min={0}
										max={store.staked}
										type="number"
									/>

									{store.staked > 0 && (
										<div style={{
											position: 'absolute',
											right: '10px',
											top: 8
										}}>
											<TextButton onClick={store.setMaxUnstakeValue} text={lang.t('Max')} />
										</div>
									)}
								</div>

								<div style={{ marginTop: '20px' }}>
									<Button
										fullWidth={true}
										avaliable={store.toUnstake > 0}
										onClick={store.onClickUnstake}
										label={lang.t('UNSTAKE')}
									/>
								</div>
							</div>
						</div>

						<div>
							{/* <Button
									avaliable={store.isStaked}
									onClick={props.onClickCloseButton}
									fullWidth={true}
									label="Claim" /> */}
							<div
								style={{
									textAlign: 'center',
									marginTop: '0.5rem',
								}}
								className="notice"
							>
								{lang.t('unstake')}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

const styles = {
	titleOfViewLeft: css({
		color: '#ffff !important',
		fontWeight: 'normal',
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	}),
	bodyOfViewTop: css({
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}),
	bodyOfViewBottom: css({
		display: 'flex',
		flexDirection: 'column',
		rowGap: '1rem'
	}),
	bodyOfViewInputs: css({
		display: 'flex',
		flexDirection: 'column',
		'@md': {
			flexDirection: 'row',
			columnGap: '30px',
		}
	}),
	buttonGroupItem: css({
		width: '100%',
		marginBottom: '1rem',
		'@md': {
			width: '50%',
			marginBottom: 0
		}
	})
}



export default LiquidtyViewForETH;
