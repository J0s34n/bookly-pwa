pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS_20', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching project code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh '''
                if [ -f package.json ]; then
                    npm install
                else
                    echo "No npm dependencies (static project)."
                fi
                '''
            }
        }

        stage('Quality & Lighthouse') {
            steps {
                echo 'Running HTMLHint and Lighthouse audit...'
                sh '''
                npx htmlhint . || true
              //  npx lighthouse http://localhost:8080 --output=json --output-path=./lighthouse-report.json || true
                '''
            }
        }

        stage('Build') {
            steps {
                echo 'Packaging Bookly PWA...'
                sh '''
                mkdir -p dist
                cp -r index.html manifest.json css js pages service-worker.js icons dist/
                '''
            }
        }

        stage('Functional Test') {
            steps {
                echo 'Running Selenium test (if applicable)...'
                sh 'npx mocha test/bookly.test.js || true'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
        success {
            echo '✅ Pipeline executed successfully.'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
