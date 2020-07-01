pipeline {
    agent any
       triggers {
        pollSCM "* * * * *"
       }
    stages {
        stage('Build Application') { 
            steps {
                echo '=== Building Application ==='
                sh 'echo build completed'
            }
        }
        stage('Build Docker Image') {
            when {
                branch 'master'
            }
            steps {
                echo '=== Building Docker Image ==='
                script {
                    image = docker.build("helloapp")
                }
            }
        }
        stage('Test Application') {
            steps {
                echo '=== Testing Application ==='
                // script {
                //     image.inside(sh 'npm test')
                // }
                //sh 'npm test'
                //TODO: test the application using the docker image built and push it repo upon successful test
            }
        }
        stage('Push Docker Image') {
            when {
                branch 'master'
            }
            steps {
                echo '=== Pushing Docker Image ==='
                script {
                    GIT_COMMIT_HASH = sh (script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                    SHORT_COMMIT = "${GIT_COMMIT_HASH[0..7]}"
                    docker.withRegistry('https://351174895685.dkr.ecr.us-east-1.amazonaws.com') {
                        image.push("$SHORT_COMMIT")
                        image.push("latest")
                    }
                }
            }
        }
        stage('Remove local images') {
            steps {
                echo '=== Delete the local docker images ==='
                sh("docker rmi -f helloapp:latest || :")
            }
        }
        stage('Deploy to EKS') {
            steps {
                echo '=== Update the deployment using the latest image ==='
                sh("sed -i 's/helloapp:latest/helloapp:$SHORT_COMMIT/g' eks/helloapp.yaml")
                sh("kubectl apply -f eks/helloapp.yaml")
                // echo '=== Restart the deployment to pick latest image ==='
                // sh("kubectl rollout restart deployment/helloapp")
                sh("kubectl rollout status deployment/helloapp")
            }
        }
    }
}
