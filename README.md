# helloapp
Hello App

#launch
docker-compose up --build

http://localhost:8080/


#redeploy
#kubectl set image deployment/helloapp helloapp=helloapp:latest

kubectl rollout restart deployment/helloapp
kubectl rollout status deployment/helloapp