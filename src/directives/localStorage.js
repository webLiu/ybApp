export default{

	name: 'localStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,

}

function localStorage() {
	return window.localStorage
}

function read(key) {//读
	return localStorage().getItem(key)
}

function write(key, data) {//写
	return localStorage().setItem(key, data)
}

function each(fn) {//获取所有本地数据
	for (var i = localStorage().length - 1; i >= 0; i--) {
		var key = localStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {//删除
	return localStorage().removeItem(key)
}

function clearAll() {//删除所有
	return localStorage().clear()
}