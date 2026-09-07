$c = Get-Content "$env:TEMP\qa3113\game.js" -Raw
$keys = @('KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowLeft', 'ArrowRight', 'KeyE', 'Escape', 'KeyQ', 'rotation', 'rotateY', 'moveRight', 'moveForward')
foreach ($pat in $keys) {
  $i = $c.IndexOf($pat)
  if ($i -ge 0) {
    Write-Output "### FOUND $pat at $i"
    $s = [Math]::Max(0, $i - 300)
    $len = [Math]::Min(700, $c.Length - $s)
    Write-Output ('...' + $c.Substring($s, $len) + '...')
    Write-Output '----'
  } else {
    Write-Output "### NOT FOUND $pat"
  }
}
