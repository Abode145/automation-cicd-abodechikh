pipeline {    
    agent any
    stages {
        stage('Deploy/Build App') {
            steps {
                sh '''
                    echo 'Application deployed successfully!'
                ''' 
            }
        }
         stage('Frontend tests') {
            steps {
               sh '''
                    cd frontend-test/
                    npm install && npm run cypress:run
                ''' 
                archiveArtifacts allowEmptyArchive: true, artifacts: 'frontend-test/cypress/videos/**'
                publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: 'frontend-test/mochawesome-report', 
                    reportFiles: 'mochawesome.html', 
                    reportName: 'Frontend report', 
                    reportTitles: ''
                ])
                
            }
        }
         stage('Backend tests') {
            steps {
                sh '''
                    cd backend/
                    npm install && npm run test:report
                ''' 
                archiveArtifacts allowEmptyArchive: true, artifacts: 'backend/cypress/videos/**'
                publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: 'backend/mochawesome-report', 
                    reportFiles: 'mochawesome.html', 
                    reportName: 'backend report', 
                    reportTitles: ''
                ])

            }
        }
         stage('Performance tests') {
            steps {
                sh '''
                    cd performance-tests/
                    rm test1.csv -Rf && rm html-reports/ -Rf
                    jmeter -n -t login-logout.jmx -l test1.csv -e -o html-reports/
                '''
                publishHTML([
                    allowMissing: false, 
                    alwaysLinkToLastBuild: false, 
                    keepAll: false, 
                    reportDir: 'performance-tests/html-reports', 
                    reportFiles: 'index.html', 
                    reportName: 'JMeter dashboard report', 
                    reportTitles: ''
                ])
            }
        }
    }

}