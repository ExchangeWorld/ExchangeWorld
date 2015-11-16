require! './func'
require! 'fs'

out = func.out
job = func.job

out '[1] Update repository [develop] ...'
job 'git checkout develop'
job 'git pull'

out '[2] Switch FB_APP_ID to product one ...'
file = job 'cat ./app/angular/core/config.js'
file = file.replace '398517123645939' '376506855853722'
fs.writeFileSync '/root/ExchangeWorld-Develop/ExchangeWorld/app/angular/core/config.js' file

job 'cat ./app/angular/core/config.js'
