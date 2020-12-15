echo Iniciando...

MY_PAT="g2o265ncv4mklenaxwlljxunz3q5ytneny3mdsjf6xdeq6omndgq"
B64_PAT=$(printf ":$MY_PAT" | base64)

echo "Atualizando DM-DASHBOARD-FRONT..."
git -c http.extraHeader="Authorization: Basic ${B64_PAT}" pull
# sh ~/apps/DM-DASHBOARD-FRONT/app_deploy.sh --prod

echo "Atualizando DM-IBMS-FRONT..."
cd ../DM-IBMS-FRONT
git -c http.extraHeader="Authorization: Basic ${B64_PAT}" pull
# sh ./app_deploy.sh --prod

echo "Atualizando DM-VALIDADOR-ECAD-FRONT..."
cd ../DM-VALIDADOR-ECAD-FRONT
git -c http.extraHeader="Authorization: Basic ${B64_PAT}" pull
# sh ./app_deploy.sh --prod