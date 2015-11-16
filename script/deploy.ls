require! './func'
require! 'fs'

out = func.out
job = func.job
working_path = func.working_path

out '[1] Update repository [develop] ...'
job 'git checkout develop'
job 'git pull'
out ''

out '[2] Switch FB_APP_ID to product one ...'
file = job 'cat ./app/angular/core/config.js'
file = file.replace '398517123645939' '376506855853722'
fs.writeFileSync working_path + '/app/angular/core/config.js' file
out ''

out '[3] Update NPM pacakages ...'
job 'npm update'
out ''

out '[4] Gulp build ...'
job 'gulp build'
out ''

out '[5] Copying the builts to Master ...'
job 'cp -rf css/       /root/ExchangeWorld/build'         {cwd: working_path + '/build/'}
job 'cp -rf js/        /root/ExchangeWorld/build'         {cwd: working_path + '/build/'}
job 'cp -rf index.html /root/ExchangeWorld/build'         {cwd: working_path + '/build/'}
job 'cp -rf images/*   /root/ExchangeWorld/images_global' {cwd: working_path + '/build/'}
job 'rm -rf /root/ExchangeWorld/build/js/main.js.map'
out ''

out '[6] Switch FB_APP_ID back ...'
job 'git checkout -- ./app/'
out ''

out '[7] Good to go'

