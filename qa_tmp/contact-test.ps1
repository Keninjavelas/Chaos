$ErrorActionPreference = "Stop"
function T($name, $json) {
  try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:3115/api/contact" -Method POST -ContentType "application/json" -Body $json -UseBasicParsing -TimeoutSec 30
    Write-Output ("$name => " + $r.StatusCode + " " + $r.Content)
  } catch {
    $resp = $_.Exception.Response
    if ($resp) {
      $sr = New-Object IO.StreamReader($resp.GetResponseStream())
      Write-Output ("$name => " + [int]$resp.StatusCode + " " + $sr.ReadToEnd())
    } else {
      Write-Output ("$name => ERR " + $_.Exception.Message)
    }
  }
}
T "VALID_NOENV" '{"name":"Auxilium V1 QA","email":"qa@example.com","subject":"Auxilium V1 Contact Test","message":"This is an intentional end-to-end V1 contact-form delivery test."}'
T "MISSING_FIELDS" '{"name":"","email":"","subject":"","message":""}'
T "BAD_EMAIL" '{"name":"A","email":"not-an-email","subject":"S","message":"M"}'
T "MALFORMED" '{"name":'
$big = '{"name":"' + ("x" * 20000) + '"}'
T "OVERSIZED" $big
T "TOO_LONG_MSG" '{"name":"A","email":"a@b.com","subject":"S","message":"' + ("y" * 5000) + '"}'
