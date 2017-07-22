var test = async function(){
	return new Promise(function(resolve, reject) {
     	setTimeout(function(){ resolve(10); }, 3000);
	})
}

var cjx = async function(){
	var promise = "cjx"//test()
	if (promise && promise.then) {
		let x = await promise;
		return "async";
	}
	return "sync"
}



let caller = async function () {
	console.log('start')

	let x = await cjx()
		console.log('end')

	console.log(x)
}

caller()