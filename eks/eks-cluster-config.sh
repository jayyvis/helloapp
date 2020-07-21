environment=$1

#
## select the cluster based on the environment input - dev | qa | prod
#
echo aws eks --region us-east-1 update-kubeconfig --name helloapp-$environment

aws eks --region us-east-1 update-kubeconfig --name petclinic
