$env:TS_NODE_COMPILER_OPTIONS = '{"module":"commonjs","moduleResolution":"node","esModuleInterop":true}'
$env:TS_NODE_TRANSPILE_ONLY = 'true'
Write-Output '--- VALIDATOR ---'
node -r ts-node/register -e "const v=require('./src/data/validatePortfolioData'); const r=v.validatePortfolioData(); const s=v.getPortfolioApprovalSummary(r); console.log('SUMMARY '+JSON.stringify(s)); console.log('WARNINGS '+r.warnings.length);"
Write-Output '--- GREP: ICETM / oral presentation ---'
(Get-ChildItem 'C:\Users\aryan\OneDrive\Desktop\Chaos\src' -Recurse -File | Select-String -Pattern 'ICETM|oral presentation' | Measure-Object).Count
Write-Output '--- GREP: Student-OS / Student_OS ---'
(Get-ChildItem 'C:\Users\aryan\OneDrive\Desktop\Chaos\src' -Recurse -File | Select-String -Pattern 'Student-OS|Student_OS' | Measure-Object).Count
Write-Output '--- GREP: phone patterns ---'
(Get-ChildItem 'C:\Users\aryan\OneDrive\Desktop\Chaos\src' -Recurse -File | Select-String -Pattern '\+91|7760|phone' | Measure-Object).Count
Write-Output '--- GREP: hardcoded SMTP creds / sendmail strings in src ---'
Get-ChildItem 'C:\Users\aryan\OneDrive\Desktop\Chaos\src' -Recurse -File | Select-String -Pattern 'pass:\s*["'']' | ForEach-Object { $_.Path + ':' + $_.LineNumber }
Write-Output '--- GREP: stray local paths in src ---'
Get-ChildItem 'C:\Users\aryan\OneDrive\Desktop\Chaos\src' -Recurse -File | Select-String -Pattern 'C:\\Users|/Users/|file:///' | ForEach-Object { $_.Path + ':' + $_.LineNumber }
Write-Output 'SWEEPS_DONE'
