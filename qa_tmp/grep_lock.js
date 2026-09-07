$c = Get-Content "$env:TEMP\qa3113\game.js" -Raw
$pats = @('.lock()', 'onPointerDown', 'onClick', 'lockPointer', 'domElement', 'requestPointerLock', 'RESUMING', 'gameMode')
foreach ($pat in $pats) {
  Write-Output "### $pat"
  $idx = 0
  $count = 0
  while (($idx = $c.IndexOf($pat, $idx)) -ge 0 -and $count -lt 8) {
    $s = [Math]::Max(0, $idx - 250)
    $len = [Math]::Min(600, $c.Length - $s)
    Write-Output ('...' + $c.Substring($s, $len) + '...')
    Write-Output '----'
    $idx += $pat.Length
    $count++
  }
}
