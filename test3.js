const http = require('http');
const processType = process.argv.slice(2)[0];
console.log(processType)


function doRequest() {
	return new Promise ((resolve, reject) => {
		let options = {
		hostname: 'codequiz.azurewebsites.net',
			port: 80,
			method: 'GET',
			headers: {
				'Cookie': 'hasCookie=true'
			}
		};

		http.get(options, function(res){
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			resolve(chunk)
		});
		res.on('end', () => {
			resolve('chunk')
		})
		});
	})
}

getRequestData = async function(){
	let res = await doRequest();
	return res

}

const app = http.createServer();
app.on('request', async (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	let wholeBody = await doRequest();
	let reg_val = '(?<='+processType+'\\<\\/td\\>\\<td\\>)(.+?)(?=\\<\\/td\\>)'
	let re = new RegExp(reg_val);
	let val = wholeBody.match(re)
	let result_val = 'no_data';
	if( val && val.length > 0){
		result_val = val[0];
	}

	res.end(result_val);
});

app.listen(3000, 'localhost');
