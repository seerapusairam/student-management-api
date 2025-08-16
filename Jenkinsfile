pipeline {
    agent any

    environment {
        IMAGE_NAME = "student-management-api"
        IMAGE_TAG  = "latest"
        CONTAINER_NAME = "student-management-api-container"
    }

    stages {
        stage('Install & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Run Container') {
            steps {
                sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Verify Running') {
            steps {
                sh "docker ps | grep ${CONTAINER_NAME}"
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true"
            }
        }
    }
}
