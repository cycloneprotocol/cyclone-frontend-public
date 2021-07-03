import BigNumber from 'bignumber.js';
import React, { useEffect } from 'react';
import God from '../God';
import Button from './Button';
import { validateAddress } from 'iotex-antenna/lib/account/utils';
import debounce from 'lodash.debounce';
import ModalView from './ModalView';
import Loading from './Loading';
import { css } from '../modules/index';
import { useStore } from '../store';
import { observer, useLocalStore, useObserver } from 'mobx-react-lite';
import EthereumConfig from '../EthereumConfig';
import { BigNumberState } from '../store/type';

export const WithdrawViewForETH = observer((props) => {
	const { lang, base } = useStore();

	const store = useLocalStore(() => ({
		address: '',
		isAddressValidate: false,
		note: '',
		noteData: null,
		depositAmount: new BigNumberState({ value: new BigNumber(0) }),
		depositBNBAmount: new BigNumberState({ value: new BigNumber(0) }),
		depositCYCAmount: new BigNumberState({ value: new BigNumber(0) }),
		currentCYCDenomination: new BigNumber(0),
		noteTime: null,
		Subsequent: 0,
		cycToWithdraw: new BigNumberState({ value: new BigNumber(0) }),
		poolFee: '',
		noteLeafIndex: -1,
		gasPrice: '1000000000000',
		gas: 1000000,
		theNoteInput: null,
		theAddressInput: null,
		poolId: 0,
		pool: {},
		tokens: null,
		indexOfToken: 0,
		anonymityFee: 0,
		rawUnit: new BigNumber(10).pow(EthereumConfig.tokensOnEthereum[props.chainID].CYCToken.decimals),

		init(chainID, isConnected) {
			store.tokens = EthereumConfig.tokensOnEthereum[chainID].tokens;
		},
		cleanup() {
			store.theNoteInput.value = '';
			store.theAddressInput.value = '';
			store.ddress = '';
			store.isAddressValidate = false;
			store.note = '';
			store.noteData = null;
			store.noteTime = null;
			store.Subsequent = 0;
			store.noteLeafIndex = -1;
			store.gasPrice = '1000000000000';
			store.gas = 1000000;
		},
		onConnect() {
			if (!props.isAvaliable && props.onConnect) {
				props.onConnect();
			}
		},
		async getDataWithNote(note) {
			const tempObject = God.parseNoteV2(note);
			store.noteData = tempObject;

			if (tempObject.error) {
				return;
			}

			this.indexOfToken = tempObject.poolId;
			store.poolId = tempObject.poolId;
			store.pool = EthereumConfig.tokensOnEthereum[tempObject.netId].pools[tempObject.poolId];

			const isSpent = await God.getIsSpent(this.pool.address, this.pool.abi, tempObject.deposit.nullifierHex);
			if (isSpent) {
				return (store.noteData = { error: 2 });
			}

			this.anonymityFee = await God.asyncCallEthereumContract(store.pool.address, store.pool.abi, 'anonymityRate', true, null);

			const theEvents = await God.findOneLog(tempObject.deposit, store.pool.address, tempObject.netId);
			if (theEvents[0]) {
				const theEvent = theEvents[0];
				store.noteTime = parseInt(theEvent.timestamp) * 1000;
				store.noteLeafIndex = parseInt(theEvent.leafIndex);
				store.Subsequent = theEvents[1].filter((e) => parseInt(e.timestamp) > parseInt(theEvent.timestamp)).length;

				if (store.pool.XRCToken) {
					store.depositAmount.setValue(new BigNumber(theEvent.tokenDenomination));
					store.depositAmount.decimals = store.pool.XRCToken.decimals;
				} else {
					store.depositAmount.setValue(new BigNumber(0));
					store.depositAmount.decimals = store.pool.decimals;
				}

				store.depositBNBAmount.setValue(new BigNumber(theEvent.coinDenomination));
				store.depositCYCAmount.setValue(new BigNumber(theEvent.cycDenomination));

				this.currentCYCDenomination = new BigNumber(
					await God.asyncCallEthereumContract(this.pool.address, this.pool.abi, 'cycDenomination', true, null)
				);

				this.cycToWithdraw.value = this.currentCYCDenomination.minus(
					this.currentCYCDenomination
						.multipliedBy(new BigNumber(this.anonymityFee).plus(new BigNumber(store.pool.relayerFee || EthereumConfig.relayerFee)))
						.dividedBy(10000)
				);
				this.poolFee = this.currentCYCDenomination
					.multipliedBy(this.anonymityFee / 10000)
					.dividedBy(new BigNumber(10).pow(store.pool.decimals))
					.toFixed(8)
					.toString();
			} else {
				store.noteData = { error: 1 };
			}
		},

		async withdraw() {
			//const ethAddress = bytesToHex(Address.fromString(store.address).bytes());
			const ethAddress = store.address;

			// const indexOfSet = God.getIndexOfSetByTokenName(store.noteData.currency);
			// this.indexOfToken = indexOfSet;

			props.withdrawStart(
				store.noteData.deposit,
				ethAddress,
				store.noteData.netId,
				store.poolId,
				this.depositAmount.value.toFixed(),
				store.note,
				parseInt(store.noteData.blockNumber)
			);
		},
	}));

	const ActionButton = useObserver(() => {
		// if (!props.isAvaliable) {
		//   return <Button avaliable={true} label={lang.t('connect')} onClick={store.onConnect} />;
		// }
		return (
			<Button
				label={lang.t('WITHDRAW')}
				avaliable={store.note && store.noteData && !store.noteData.error && store.noteLeafIndex >= 0 && store.isAddressValidate ? true : false}
				onClick={store.withdraw}
			/>
		);
	});
	// }, [props.isAvaliable, store.note, store.noteData, store.noteLeafIndex, store.isAddressValidate]);

	// useEffect(() => {
	//   setTimeout(() => {
	//     store.connect();
	//   }, 1000);
	// }, [])

	useEffect(() => {
		store.init(props.chainID, props.isAvaliable);
	}, [props.chainID, props.isAvaliable]);

	return (
		<div
			className={styles.withdraw}
			style={{
				height: store.note && store.noteData ? '539px' : '420px',
			}}
		>
			<div className={styles.note}>
				<div className="header">{lang.t('note')}</div>
				<div className="flex">
					<input
						ref={(node) => (store.theNoteInput = node)}
						className="input"
						type="text"
						onChange={debounce(() => {
							store.note = store.theNoteInput.value;
							store.noteData = null;
							store.noteTime = null;
							store.noteLeafIndex = -1;
							store.Subsequent = 0;

							store.getDataWithNote(store.theNoteInput.value);
						}, 3000)}
						style={{ borderColor: store.noteData && store.noteData.error ? 'red' : '#45bcb8' }}
						placeholder="Please enter your note"
					/>
				</div>

				{store.note &&
					store.noteData &&
					(!store.noteData.error ? (
						store.noteLeafIndex >= 0 ? (
							<div style={{ marginTop: '0.5rem' }}>
								<div className="noteData">
									<div>{lang.t('deposit.amount')}</div>

									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-end',
										}}
									>
										{store.depositAmount.value.comparedTo(0) > 0 && (
											<div style={{ color: '#45BCB8' }}>
												{store.depositAmount.format}&nbsp;{store.pool.symbol}
											</div>
										)}

										<div style={{ color: '#45BCB8' }}>{store.depositBNBAmount.format}&nbsp;BNB</div>

										<div style={{ color: '#45BCB8' }}>{store.depositCYCAmount.format}&nbsp;CYC</div>
									</div>
								</div>

								<div className="noteData">
									<div>{lang.t('time.passed')}</div>
									<div style={{ color: '#E84D4D' }}>{base.timeAgo.format(new Date(store.noteTime))}</div>
								</div>

								<div className="noteData">
									<div>{lang.t('subsequent.deposits')}</div>
									<div style={{ color: '#45BCB8' }}>
										&gt;=&nbsp;{store.Subsequent}&nbsp;{lang.t('Deposits')}
									</div>
								</div>

								<div className="noteData">
									<div>{lang.t('pool.fee')}</div>
									<div style={{ color: '#45BCB8' }}>{store.poolFee}&nbsp;CYC</div>
								</div>

								<div className="noteData">
									<div>{lang.t('relayer.fee')}</div>
									<div style={{ color: '#45BCB8' }}>
										{store.currentCYCDenomination
											.multipliedBy((store.pool.relayerFee || EthereumConfig.relayerFee) / 10000)
											.dividedBy(new BigNumber(10).pow(store.pool.decimals))
											.toFixed(8)}
                    &nbsp;CYC
                  </div>
								</div>

								<div className="noteData">
									<div>{lang.t('amount.to.withdraw')}</div>

									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-end',
										}}
									>
										{store.depositAmount.value.comparedTo(0) > 0 && (
											<div style={{ color: '#45BCB8' }}>
												{store.depositAmount.format}&nbsp;{store.pool.symbol}
											</div>
										)}

										<div style={{ color: '#45BCB8' }}>{store.depositBNBAmount.format}&nbsp;BNB</div>

										<div style={{ color: '#45BCB8' }}>{store.cycToWithdraw.format}&nbsp;CYC</div>
									</div>
								</div>
							</div>
						) : (
							<ModalView>
								<Loading text={lang.t('Loading.text8')} />
							</ModalView>
						)
					) : (
						<div
							style={{
								marginTop: '0.5rem',
								fontSize: '12px',
								color: 'red',
							}}
						>
							{store.noteData.error === 2 ? lang.t('invalid.spent') : lang.t('invalid')}
						</div>
					))}
			</div>

			<div className={styles.recipient}>
				<div className="header">{lang.t('recipient.address')}</div>
				<div className="recipient-tips">{lang.t('recipient.tips')}</div>
				<div className="flex">
					<input
						ref={(node) => (store.theAddressInput = node)}
						className="input"
						type="text"
						onChange={debounce(async () => {
							store.address = store.theAddressInput.value;

							if (store.theAddressInput.value.length < 41) {
								return;
							}

							let tempBool = false;
							if (God.isEthereum) {
								tempBool = God.web3.utils.isAddress(store.theAddressInput.value);
							} else {
								tempBool = validateAddress(store.theAddressInput.value);
							}
							store.isAddressValidate = tempBool;
						}, 1500)}
						placeholder={lang.t('paste.address')}
					/>
				</div>
			</div>

			<div className={styles.buttonPanel}>{ActionButton}</div>

			<div
				style={{
					marginLeft: '64px',
					marginRight: '28px',
					fontSize: '12px',
					paddingLeft: '50px',
					paddingTop: '6px',
					paddingBottom: '6px',
				}}
			>
				&nbsp;
      </div>
		</div>
	);
});

const styles = {
	withdraw: css({
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column',
		'@md': {
			height: 'auto',
		},
	}),
	note: css({
		marginTop: '1rem',
		marginLeft: '8vw',
		marginBottom: '1.5rem',
		paddingRight: '40px',
		'@md': {
			marginTop: '25px',
			marginLeft: '40px',
		},
	}),
	recipient: css({
		marginLeft: '8vw',
		marginBottom: '2rem',
		paddingRight: '10vw',
		'@md': {
			marginLeft: '40px',
			paddingRight: '40px',
		},
		'.flex': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			'.paste': {
				padding: '0 0.25rem',
				cursor: 'pointer',
				fontSize: '14px',
				fontWeight: 500,
				lineHeight: '40px',
				color: '#fff',
				backgroundColor: 'rgb(69, 188, 184)',
			},
		},
		'.recipient-tips': {
			fontSize: 12,
			marginBottom: 8,
			color: 'red',
		},
	}),
	buttonPanel: css({
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '1.28rem',
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
		},
	}),
};

export default WithdrawViewForETH;
