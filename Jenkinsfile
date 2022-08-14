pipeline {
    agent any

    environment {
        registryCredential = 'DockerCredential'
    }

    triggers {
        pollSCM('* * * * *') //polling for changes, here once a minute
    }

    stages {
        stage('S-1: Starting Job') {
            steps {
                echo 'Starting job, cleaning workspace'
                deleteDir()
            }
        }
        stage('S-2: Checkout code') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/bulbul-dev/HRMS_THYMLEAFF.git']]])
            }
        }
        stage('S-3: Gradle build') {
            steps {
                bat 'gradlew.bat clean build'
            }
        }
        stage('S-3: Test') {
             steps {
                echo 'Starting test'
            }

        }
        stage('S-4: Deploy to Tomcat') {
             steps {
               echo 'Start deploy...'
               deploy adapters: [tomcat8(credentialsId: 'tomcatUser', path: '', url: 'http://localhost:8080/')], contextPath: 'tm-cicd-app', war: '**/*.war'
            }
        }
        stage('S-5: Finished Job') {
            steps {
                echo 'Finished Job'
            }
        }

    }
    post {
        always {
            echo 'Finished CI/CD Job'
        }
    }
}