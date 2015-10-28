var child_process = require('child_process')
var _ = require('lazy.js')

console.log('[0] Checking current directory ...')
var str = child_process.spawnSync('pwd').output.toString()
if (_(str).contains('/ExchangeWorld/script')) {
	console.log('=:> In /ExchangeWorld/script, good')
} else {
	console.log('=:> Not in /ExchangeWorld/script, leaving')
	process.exit()
}

