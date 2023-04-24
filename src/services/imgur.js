import axios from "axios";
const clientId = "f472ae0b1cb469c",
      accessToken = '4c5a0814482382318421cfbc00c112186ef4f9b6',
      authClient = `Client-ID ${clientId}`,
      beaderToken = `Bearer ${accessToken}`,
	  refresh_token = '381a0c931c827eaa3a8eced642b90305383ed184',
	  client_secret='7b55b6e153e717a9fc15ed52c769d092313b8eb6';

export const imgurUpload = (formData) => {
	return axios.post('https://api.imgur.com/3/upload', formData, {
		headers: {Authorization: beaderToken }
	})
}

export const generateAccessToken = () =>{

		return axios.post('https://api.imgur.com/oauth2/token', {
			refresh_token: refresh_token,
			client_id: clientId,
			client_secret: client_secret,
			grant_type: refresh_token
	})
}

export const testImgur = (imageLink) =>{
	return axios.get('https://api.imgur.com/3/image/ggRC6T7', {
		headers: {
			Authorization: beaderToken
		}
	})
}