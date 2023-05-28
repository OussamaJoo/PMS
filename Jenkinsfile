/* Requires the Docker Pipeline plugin */
pipeline {
    agent {label 'docker-agent'}
    stages {
        stage('build_back') {
            steps {
                echo "building backend"
                
              sh 'docker-compose build --no-cache --parallel backend'
          
            }
            }
            
          stage('build_front') {
            steps {
              echo "building frontend"
              sh 'docker-compose build --parallel frontend'
            }
            }
           stage('build_images') {
            steps {
              /*  sh 'docker-compose -f docker-compose.yml build' */
                echo ""
               
            }
            }
           stage('push_images') {
            steps {
               /* sh 'docker ps' */
                echo ""
                
               
            }
            } 
            
            stage('deploy') {
            steps {
                sh 'docker-compose down' 
                sh 'docker-compose up -d' 
                echo ""
            }
            }
            stage('E2E_test') {
            steps {
                echo "E2E Test"
                
            }
        }
    }
    
    
    
     post {  
         always {  
             echo 'This will always run'  
         }  
         success {  
             echo 'This will run only if successful'  
         }  
         failure {  
            echo "Failure"
            /*
             mail bcc: '', body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "foo@foomail.com";  
         */
         }  
         unstable {  
             echo 'This will run only if the run was marked as unstable'  
         }  
         changed {  
             echo 'This will run only if the state of the Pipeline has changed'  
             echo 'For example, if the Pipeline was previously failing but is now successful'  
         }  
     } 
}
