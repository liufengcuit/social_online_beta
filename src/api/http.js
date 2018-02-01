import axios from 'axios'

const host = "http://social.haboai120.com"

export default {
	get(url, params = {}){
		return new Promise((resolve, reject) => {
			params.signString = signString
			axios.get(host+url, params).then( res => {
				resolve(res.data)
			}).catch(error => {
				reject(error)
			})
		})
	},
	getQuick(url){
		return new Promise((resolve, reject) => {
			axios.get(host+url).then(res => {
				resolve(res.data)
			}).catch(error => {
				reject(error)
			})
		})
	},
	post(url, params = {}){
		return new Promise((resolve, reject) => {
			params.signString = signString
			axios.post(host+url, params).then(res => {
				resolve(res.data)
			}).catch(error => {
				reject(error)
			})
		})
	},
	postBody(url, formParams ={}){
		return new Promise((resolve, reject) => {
			formParams.append("signString", signString)
			axios.post(host+url, formParams, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(res => {
				resolve(res.data)
			}).catch(error => {
				reject(error)
			})
		})
	}
}