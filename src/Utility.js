import isMobile from 'ismobilejs';
const Utility = {
	isInMobile: function () {
		return isMobile(navigator.userAgent).any
	},
	isIoPayMobile: function () {
		return navigator.userAgent && (navigator.userAgent.includes("IoPayAndroid") || navigator.userAgent.includes("IoPayiOs"));
	},

	toFixString: function (str, length) {
		if (str && str.length > length) {
			return str.substr(0, length) + '...'
		} else {
			return str
		}
	}
}

export default Utility
