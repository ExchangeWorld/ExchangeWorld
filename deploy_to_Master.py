import subprocess
import sys


print '[0] Checking current directory ...'
str = subprocess.check_output(["pwd"])
if ('/ExchangeWorld' in str):
    print '=:> In /ExchangeWorld, good\n'
else:
    print '=:> Not in /ExchangeWorld, leaving\n'
    sys.exit()


print '\n[1] Switching branch to develop ...'
str = subprocess.check_output(["git", "checkout", "develop"])
print '=:> ' + str


print '\n[2] Git pull ...'
str = subprocess.check_output(["git", "pull"])
print '=:> ' + str


print '\n[3] Change FB APP ID to Product one ...'
str = subprocess.check_output(["cat", "./app/angular/core/config.js"])
str = str.replace("// FacebookProvider.init('376506855853722')",
                  "FacebookProvider.init('376506855853722')")
str = str.replace("FacebookProvider.init('398517123645939')",
                  "// FacebookProvider.init('398517123645939')")
toProduct = open('./app/angular/core/config.js', 'w')
toProduct.write(str)
toProduct.close()
print '=:> Done\n'


print '\n[4] Gulp build ...'
str = subprocess.check_output(["gulp", "build"])
print '=:> ' + str


print '\n[5] Reset FB APP ID to Develop one ...'
str = subprocess.check_output(["git", "checkout", "--", "./app/angular/core/config.js"])
print '=:> Done'


print '\n[6] Copy built file to Master (File server) one...'
subprocess.check_output(["rm", "-f", "./build/js/main.js.map"])
subprocess.check_output(["cp", "-rf", "./build/css", "../../ExchangeWorld/build"])
subprocess.check_output(["cp", "-rf", "./build/js", "../../ExchangeWorld/build"])
subprocess.check_output(["cp", "-f", "./build/index.html", "../../ExchangeWorld/build"])
subprocess.Popen(["cp", "-rf", "./build/images/*", "../../ExchangeWorld/images_global"], shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
subprocess.check_output(["cp", "-f", "./build.tar.gz", "../../ExchangeWorld"])
print '=:> Done'


print '\n[7] Done!\n'
