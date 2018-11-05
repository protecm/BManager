@echo off
echo "------CLEAN-------"
rmdir /s /q BManager

echo "-----PREPARE------"
mkdir BManager

echo "---BUILD CLIENT---"
call grunt --gruntfile .\WebClient\Gruntfile.js
xcopy /s /q .\WebClient\release .\BManager
call grunt --gruntfile .\WebClient\Gruntfile.js clean:release

echo "---BUILD SERVER---"
xcopy /s /q /EXCLUDE:exclude_list.txt .\WebServer .\BManager