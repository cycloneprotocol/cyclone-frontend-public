import React, { useState } from 'react';
import { useStore } from '../../store';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Link, useHistory } from 'react-router-dom';
import { Wrapper, Text, FlexBox, Icon, Section, Button } from '../../modules/globalStyle';
import { styled } from '../../modules/index';

const langGroups = {
	en: { name: 'EN', src: '/images/EN.png', text: 'en' },
	ru: { name: 'RU', src: '/images/RU.png', text: 'ru' },
	zh_CN: { name: 'CN', src: '/images/CN.png', text: 'zh_CN' },
};

export const LinksLanguage = observer(() => {
	const { lang } = useStore();
	const store = useLocalStore(() => ({
		get curLang() {
			if (!langGroups[lang.lang]) return langGroups.en;
			return langGroups[lang.lang];
		},
	}));

	return (
		<Container>
			<li>
				<Link to="/analytics">
					<img src="images/home/analysis.png" className="logo" alt="" />
				</Link>
			</li>
			<li>
				<a href="https://twitter.com/cycloneprotocol" target="_blank" rel="noopener noreferrer">
					<img src="images/home/twitter.png" className="logo" alt="" />
				</a>
			</li>
			<li>
				<a href="https://t.me/cycloneprotocol" target="_blank" rel="noopener noreferrer">
					<img src="images/home/tele.png" className="logo" alt="" />
				</a>
			</li>
			<li>
				<a href="https://github.com/cycloneprotocol" target="_blank" rel="noopener noreferrer">
					<img src="images/home/github.png" className="logo" alt="" />
				</a>
			</li>
			<li>
				<a href="https://cycloneprotocol.medium.com/" target="_blank" rel="noopener noreferrer">
					<img src="images/home/medium.png" className="logo" alt="" />
				</a>
			</li>
			<li>
				<div className="line"></div>
			</li>
			<li>
				<LangSelect>
					<div className="langList">
						<ul>
							{Object.values(langGroups).map((item) => {
								return (
									<li
										className={item.text === lang.lang ? 'active' : ''}
										key={item.name}
										onClick={() => lang.setLang(item.text)}
									>
										<img src={item.src} alt="" />
										<span>{item.name}</span>
									</li>
								);
							})}
						</ul>
					</div>
					<img className="cityIcon" src={store.curLang.src} alt="" />
				</LangSelect>
			</li>
		</Container>
	);
});



const Container = styled('article', {
	display: 'flex',
	alignItems: 'flex-end',
	listStyleType: 'none',
	padding: 0,
	margin: '0 0 2rem 0',
	'@md': {
		marginBottom: 0,
	},
	li: {
		marginRight: 8,
		cursor: 'pointer',
		'&:last-child': {
			marginRight: 0,
		},
		'.line': {
			height: '1.5rem',
			width: '1px',
			backgroundColor: '#45BCB8',
			marginLeft: 5,
			marginRight: 5,
		},
		img: {
			width: '1.5rem',
			height: '1.5rem',
			borderRadius: '50%',
		},
	},

});

const LangSelect = styled('div', {
	position: 'relative',
	'.cityIcon': {
		width: '1.5rem',
		height: '1.5rem',
		borderRadius: '50%',
		cursor: 'pointer',
	},
	ul: {
		listStyleType: 'none',
		width: '64px',
		textAlign: 'left',
		padding: 0,
		margin: 0,
		display: 'none',
		li: {
			width: '100%',
			boxSizing: 'border-box',
			padding: '6px 10px',
			fontSize: '12px',
			display: 'flex',
			alignItems: 'center',
			cursor: 'pointer',
			color: '#fff',
			img: {
				width: '22px',
				height: '22px',
				marginRight: '7px',
			},
			'&:hover': {
				backgroundColor: '$primary',
				color: '#000',
			},
		},
		'.active': {
			background: '$primary',
			color: '#000',
		},
	},
	'.langList': {
		position: 'absolute',
		top: 0,
		left: '0',
		paddingBottom: '26px',
		width: '64px',
		height: '1.5rem',
		'&:hover': {
			height: 140,
			top: '-112px',
			ul: {
				display: 'block',
				backgroundColor: '$bg1',
			},
		},
	},
})