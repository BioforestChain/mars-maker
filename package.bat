@echo off

:: use pkg to package bcf


call node scripts/prePkg.js
call pkg package.json -t node16-win-x64 --options "max_old_space_size=8172,no_deprecation"
call node scripts/afterPkg.js
echo may you be happy and prosperous