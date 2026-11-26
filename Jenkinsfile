pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    skipDefaultCheckout(true)
  }

  triggers {
    pollSCM('H/5 * * * *')
  }

  environment {
    IMAGE_NAME = "demoqa-playwright:${BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build test image') {
      steps {
        sh 'docker build --pull -t "$IMAGE_NAME" .'
      }
    }

    stage('Run Playwright suite') {
      steps {
        sh '''
          mkdir -p "$WORKSPACE/test-results" "$WORKSPACE/playwright-report"
          docker run --rm --shm-size=1g \
            -e CI=true \
            -v "$WORKSPACE/test-results:/app/test-results" \
            -v "$WORKSPACE/playwright-report:/app/playwright-report" \
            "$IMAGE_NAME"
          test -s "$WORKSPACE/test-results/junit.xml"
        '''
      }
    }
  }

  post {
    always {
      junit testResults: 'test-results/junit.xml', allowEmptyResults: true
      archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true
    }
  }
}
