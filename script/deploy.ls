require! './func'
require! 'fs'
require! 'path'

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
fs.writeFileSync(path.resolve(working_path, './app/angular/core/config.js'), file)
out ''

out '[3] Update NPM pacakages ...'
job 'npm update'
out ''

out '[4] Gulp build ...'
job 'gulp build'
job 'gulp build'
out ''

out '[5] Copying the builts to Master ...'
job 'cp -rf css/            ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'cp -rf js/             ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'cp -rf index.html      ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'cp -rf xmas-share.html ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'cp -rf images/*        ' + path.resolve(working_path, '../../ExchangeWorld/images_global'), {cwd: path.resolve(working_path, './build/')}
job 'cp -rf data/*          ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'rm -rf                 ' + path.resolve(working_path, '../../ExchangeWorld/build/js/main.js.map')

job 'cp -rf css/            ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'cp -rf js/             ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'cp -rf index.html      ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'cp -rf xmas-share.html ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'cp -rf images/*        ' + path.resolve(working_path, '../../ExchangeWorld/images_global'), {cwd: path.resolve(working_path, './build/')}
job 'cp -rf data/*          ' + path.resolve(working_path, '../../ExchangeWorld/build'),         {cwd: path.resolve(working_path, './build/')}
job 'rm -rf                 ' + path.resolve(working_path, '../../ExchangeWorld/build/js/main.js.map')
out ''

out '[6] Switch FB_APP_ID back ...'
job 'git checkout -- ./app/'
out ''

out '[7] Good to go'
