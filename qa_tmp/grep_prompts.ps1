$pats = @('Personnel file', 'Springer', 'Employee timeline', 'intake', 'Aryan', 'PERSONNEL', 'timeline')
foreach ($pat in $pats) {
  Write-Output "##### $pat"
  $m = Select-String -Path "$env:TEMP\qa3113\data.js", "$env:TEMP\qa3113\rooms.js", "$env:TEMP\qa3113\props.js", "$env:TEMP\qa3113\ui.js" -Pattern ([regex]::Escape($pat)) | Select-Object -First 4
  foreach ($x in $m) {
    $l = $x.Line
    if ($l.Length -gt 300) { $l = $l.Substring(0, 300) }
    Write-Output ("[" + (Split-Path $x.Path -Leaf) + ":" + $x.LineNumber + "] " + $l)
  }
}
