import axios from 'axios'

export default {
	get(url, params = {}){
		return new Promise((resolve, reject) => {
			params.signString = signString
			axios.get(url, params).then( res => {
				resolve(res.data)
			}).catch(error => {
				reject(error)
			})
		})
	},
	getQuick(url){
		return new Promise((resolve, reject) => {
			axios.get(url, params).then(res => {
				resolve(res.data)
			}).catch(error => {
				reject(error)
			})
		})
	},
	post(url, params = {}){
		return new Promise((resolve, reject) => {
			params.signString = signString
			axios.post(url, params).then(res => {
				resolve(res.data)
			}).catch(error => {
				reject(error)
			})
		})
	}
}