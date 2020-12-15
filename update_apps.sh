echo Iniciando...

MY_PAT="g2o265ncv4mklenaxwlljxunz3q5ytneny3mdsjf6xdeq6omndgq"
B64_PAT=$(printf ":$MY_PAT" | base64)

echo "Atualizando DM-PROXY-KIBANA..."
git -c http.extraHeader="Authorization: Basic ${B64_PAT}" pull