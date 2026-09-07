param([int]$Start, [int]$End, [string]$File)
$c = Get-Content $File
for ($i = $Start; $i -le $End -and $i -lt $c.Length; $i++) {
  Write-Output ("{0}: {1}" -f ($i + 1), $c[$i])
}
