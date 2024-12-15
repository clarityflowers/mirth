@echo off

cl /WX /MD /F 4194304 /TC bin\mirth0.c /Fobin\wmirth0.obj  /Febin\wmirth0.exe /link legacy_stdio_definitions.lib /WX || goto :error
bin\wmirth0.exe src\main.mth -o bin\wmirth1.c || goto :error

cl /WX /MD /F 4194304 /TC bin\wmirth1.c /Fobin\wmirth1.obj /Febin\wmirth1.exe /link legacy_stdio_definitions.lib /WX || goto :error
bin\wmirth1.exe src\main.mth -o bin\wmirth2.c || goto :error

cl /WX /W3 /MD /F 4194304 /TC bin\wmirth2.c /Fobin\wmirth2.obj /Febin\wmirth2.exe /link legacy_stdio_definitions.lib /WX || goto :error
bin\wmirth2.exe src\main.mth -o bin\wmirth3.c || goto :error

goto :EOF

:error
echo Build failed with error #%errorlevel%.
exit /b %errorlevel%
