pipeline {
    agent any
    triggers {
        pollSCM "* * * * *"
    }
    stages {
        stage('Build Application') { 
            when {
                anyOf {
                branch 'feature/*'
                branch 'release'
                }
            }
            steps {
                echo '=== Building Application ==='
                sh 'echo build completed'
            }
        }
        stage('Build Docker Image') {
            when {
                anyOf {
                branch 'feature/*'
                branch 'release'
                }
            }
            steps {
                echo '=== Building Docker Image ==='
                script {
                    image = docker.build("helloapp")
                }
            }
        }
        stage('Test Application') {
            when {
                anyOf {
                branch 'feature/*'
                branch 'release'
                }
            }
            agent { docker 'helloapp:latest' }
            steps {
                echo '=== Testing Application ==='
                sh 'npm test'
            }
        }
        stage('Publish Docker Image') {
            when {
                anyOf {
                branch 'feature/*'
                branch 'release'
                }
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
                echo '=== Delete the local docker image ==='
                sh("docker rmi -f helloapp:latest || :")
            }
        }
       
        stage('Deploy to DEV EKS') {
            when {
                branch 'feature/*'
            }
            steps {
                echo '=== Update the deployment using the latest image ==='
                sh("sed -i 's/helloapp:latest/helloapp:$SHORT_COMMIT/g' eks/helloapp.yaml")
                sh("kubectl apply -f eks/helloapp.yaml")
                // echo '=== Restart the deployment to pick latest image ==='
                // sh("kubectl rollout restart deployment/helloapp")
                sh("kubectl rollout status deployment/helloapp")
            }
        }
        stage('Deploy to QA EKS') {
            when {
                branch 'release'
                beforeInput true
            }
            input "Deploy to QA?"
            steps {
                echo '=== Deploying the app to QA EKS cluster ==='
            }
        }
        stage('Deploy to PROD EKS') {
            when {
                branch 'release'
                beforeInput true
            }
            input "Deploy to PROD?"
            steps {
                echo '=== Deploying the app to PROD EKS cluster ==='
            }
        }
    }
}
