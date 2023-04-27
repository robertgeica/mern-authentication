import axios from 'axios';

const setAuthTokenHeader = (token: string) => {
	if (token) {
		axios.defaults.headers.common['authorization'] = 'Bearer ' + token;
	} else {
		delete axios.defaults.headers.common['authorization'];
	}
};

export default setAuthTokenHeader;