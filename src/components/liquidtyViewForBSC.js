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
import { eventBus } from '../lib/event';
import CountUp from 'react-countup';

const rawUnit = new BigNumber(10).pow(EthereumConfig.tokensOnEthereum[God.chainID].LPToken.decimals);

export const LiquidtyViewForBSC = observer(props => {
	const { lang, bsc: pageStore, base: baseStore } = useStore();

	const store = useLocalStore(() => ({
		balance: 0,
		staked: new BigNumber(0),
		toStake: new BigNumber(0),
		toUnstake: new BigNumber(0),
		allowance: new BigNumber(0),
		// isStaked: false,
		// lpTokens: [],
		// valuesOfToken: [],
		valuesOfToken: {},
		price: [1.0],
		cycBalance: -1,
		LPTokenBalance: new BigNumber(0),
		// APY: -1,
		theStakeInput: null,
		theUnstakeInput: null,
		rewardDaily: null,

		async computeRewardDaily() {
			const rewardPerBlock = await God.asyncGetRewardPerBlock();
			const rewardDaily = new BigNumber(rewardPerBlock).multipliedBy(86400 / 3).dividedBy(1e18);
			this.rewardDaily = rewardDaily;
		},

		async getLPTokens() {
			store.getValuesOfToken();
		},

		async getLPTokenBalance() {
			const abi = await God.asyncGetABI(pageStore.CurrentNetwork.LPToken.abi);
			const balance = await God.asyncGetBalanceOf(pageStore.CurrentNetwork.LPToken.address, abi)
			store.LPTokenBalance = new BigNumber(balance).dividedBy(rawUnit);
			// .toFixed(6, 1);
		},

		async getValuesOfToken() {
			let tokenName;
			let earned;
			let balance;
			let staked;
			let valueStaked;
			let allowance;
			const res = await Promise.all([
				God.asyncGetTokenNameByAddress(pageStore.CurrentNetwork.CYCToken.address),
				God.asyncGetEarnedByIndexOfLPToken(0),
				God.asyncGetBalanceByIndexOfLPToken(0),
				God.asyncGetAllowanceByIndexOfLPToken(0),
				God.asyncGetStakedByIndexOfLPToken(0)
			]);

			tokenName = res[0];
			earned = new BigNumber(res[1]);
			balance = new BigNumber(res[2]);
			allowance = new BigNumber(res[3]);
			// FIXME (zero) Unhandled Rejection (TypeError): Cannot read property '0' of null
			staked = new BigNumber(res[4][0]).dividedBy(rawUnit);

			valueStaked = staked * store.price[0];

			store.balance = balance;
			store.staked = staked;
			store.allowance = allowance;

			store.valuesOfToken.tokenName = tokenName;
			store.valuesOfToken.earned = earned;
			store.valuesOfToken.balance = balance;
			store.valuesOfToken.staked = staked;
			store.valuesOfToken.valueStaked = valueStaked;

		},

		onChangeStake(event) {
			let tempInt = Number(event.target.value);
			if (!tempInt) {
				tempInt = 0;
			}

			// if (tempInt > store.LPTokenBalance) {
			if (store.LPTokenBalance.comparedTo(tempInt) < 0) {
				return;
			}
			store.toStake = tempInt;
		},

		onChangeUnstake(event) {
			let tempInt = Number(event.target.value);
			if (!tempInt) {
				tempInt = 0;
			}

			// if (tempInt > store.staked) {
			if (store.staked.comparedTo(tempInt) < 0) {
				return;
			}

			store.toUnstake = tempInt;
		},

		async onClickStake(event) {
			// const tokenABI = await God.asyncGetABI(pageStore.CurrentNetwork.CYCToken.abi);
			const tokenABI = await God.asyncGetABI(pageStore.CurrentNetwork.LPToken.abi);
			props.stake(
				new BigNumber(store.toStake).multipliedBy(rawUnit).toString(),
				// pageStore.CurrentNetwork.CYCToken.address,
				pageStore.CurrentNetwork.LPToken.address,
				tokenABI,
				{ allowance: store.allowance.toString() }
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
					_amount: new BigNumber(store.toUnstake).multipliedBy(1e18).toString()
				},
				result => {
					props.unstake(result);
				}
			);
		},

		setMaxStakeValue() {
			if (store.theStakeInput) {
				store.theStakeInput.value = store.LPTokenBalance.toFixed();
			}
			store.toStake = store.LPTokenBalance.toFixed();
		},

		setMaxUnstakeValue() {
			if (store.theUnstakeInput) {
				store.theUnstakeInput.value = store.staked.toFixed();
			}

			store.toUnstake = store.staked.toFixed();
		},

		async claim() {
			await God.asyncCallEthereumContract(pageStore.CurrentNetwork.Aeolus.address, pageStore.CurrentNetwork.Aeolus.abi, "deposit", false, "0", "0");
			// God.claim(result => {
			//   if (result) {
			//     store.getLPTokens();
			//   }
			// });
		},

		async getCYCBalance() {
			const abi = await God.asyncGetABI(pageStore.CurrentNetwork.CYCToken.abi);
			const balance = await God.asyncGetBalanceOf(pageStore.CurrentNetwork.CYCToken.address, abi);
			console.log({ balance })
			store.cycBalance = new BigNumber(balance)
				.dividedBy(1e18)
				.toFixed(9)
				.toString();
		}
	}));

	useEffect(() => {
		if (!props.isAvailable) {
			props.connect();
		}
	}, []);

	useEffect(() => {
		if (props.isAvailable) {
			Promise.all([store.getLPTokens(), store.getCYCBalance(), store.getLPTokenBalance(), store.computeRewardDaily()]);
		}
	}, [props.chainID, props.isAvailable, baseStore.refetchTimer]);

	return (
		<div className="borderedView">
			<div className="checkNoteView">
				<div className="titleOfView" style={{ padding: '1rem' }}>
					<div className={styles.titleOfViewLeft}>
						<div className="td" style={{ fontWeight: 'bold', minWidth: '100px' }}>
							{lang.t('cyc.lp.mining.title')}
						</div>
						<div className="td" style={{ minWidth: '150px' }}>
							{lang.t('total.apy')}: {store.APY == -1 ? '...' : `${pageStore.liquidityApy}%`}
						</div>
						<div className="td" style={{ minWidth: '180px' }}>
							{lang.t('balance')}: {store.cycBalance == -1 ? '...' : new BigNumber(store.cycBalance).toFixed(4)} CYC
            </div>
						<div className="td" style={{ minWidth: '180px' }}>
							{lang.t('earned')}: {store.valuesOfToken.earned ? <CountUp preserveValue start={0} end={new BigNumber(store.valuesOfToken.earned).dividedBy(10 ** 18).toNumber()} duration={3} decimals={6} /> : '...'}{' '}
              CYC
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
							{lang.t('cyc.bsc.pool.token')}
							<span className="tooltip" data-tip="" data-for="ff">
								i
              </span>
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
								href={"https://exchange.pancakeswap.finance/#/add/BNB/0x810EE35443639348aDbbC467b33310d2AB43c168"}
								label={lang.t('add.liquidity')}
							/>
						</div>
					</div>
					<div>
						{lang.t('mining.reward.today')}:&nbsp;
            {store.rewardDaily ? (store.rewardDaily.comparedTo('0') === 0 ? 0 : store.rewardDaily.toFixed(2)) : '...'}
            &nbsp;CYC
          </div>
					<div className={styles.bodyOfViewBottom}>
						<div className={styles.bodyOfViewInputs}>
							<div className={styles.buttonGroupItem}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between'
									}}
								>
									<div>
										{lang.t('balance')}: {store.LPTokenBalance == -1 ? '...' : store.LPTokenBalance.toFixed()} LP
                  </div>
								</div>

								<div
									style={{
										position: 'relative'
									}}
								>
									<input
										className="input"
										ref={node => (store.theStakeInput = node)}
										onChange={store.onChangeStake}
										min={0}
										max={store.LPTokenBalance.toFixed()}
										type="number"
									/>
									{store.LPTokenBalance.comparedTo(0) > 0 && (
										<div
											style={{
												position: 'absolute',
												right: '10px',
												top: 8
											}}
										>
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
										justifyContent: 'space-between'
									}}
								>
									<div>Staked: {store.staked == -1 ? '...' : new BigNumber(store.staked).toFixed()} LP</div>
								</div>

								<div style={{ position: 'relative' }}>
									<input
										className="input"
										ref={node => (store.theUnstakeInput = node)}
										onChange={store.onChangeUnstake}
										min={0}
										max={store.staked}
										type="number"
									/>

									{store.staked > 0 && (
										<div
											style={{
												position: 'absolute',
												right: '10px',
												top: 8
											}}
										>
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
									marginTop: '0.5rem'
								}}
								className="notice"
							>
								<div>{lang.t("stake.fee")}</div>
								<div>{lang.t('unstake')}</div>
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
		flexWrap: 'wrap'
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
			columnGap: '30px'
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
};

export default LiquidtyViewForBSC;
