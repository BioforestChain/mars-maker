echo 'pkg有些bug,若需要打包windows版本的 则需要再windows环境下打包，不要在bash下打包'
echo '运行 pkg package.json -t node16-win-x64 --options "max_old_space_size=8172,experimental-worker" '
echo '若需要打包linux环境的则直接运行下面的语句, 且目前node16有bug'
# // 20g=20480 16g=16384,expose-gc
echo '目前node16的bug已修复, 先用这个打包 试试看会不会有bug, 不要在下面这句话后加东西'
node scripts/prePkg.js;pkg package.json -t node16-linux-x64 --options "max_old_space_size=20480,no_deprecation";node scripts/afterPkg.js