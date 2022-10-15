pipeline {
  agent any
   stages {
    stage ('Build') {
      steps {
        sh '''#!/bin/bash
        python3 -m venv test3
        source test3/bin/activate
        pip install pip --upgrade
        pip install -r requirements.txt
        export FLASK_APP=application
        flask run &
        '''
     }
   }
    stage ('test') {
      steps {
        sh '''#!/bin/bash
        source test3/bin/activate
        py.test --verbose --junit-xml test-reports/results.xml
        ''' 
      }
    
      post{
        always {
          junit 'test-reports/results.xml'
        }
       
      }
    }
   stage ('Clean') {
    agent{label 'awsDeploy'}
          steps {
          sh '''#!/bin/bash
          if [[ $(ps aux | grep -i "gunicorn" | tr -s " " | head -n 1 | cut -d " " -f 2) != 0 ]]
          then
          ps aux | grep -i "gunicorn" | tr -s " " | head -n 1 | cut -d " " -f 2 > pid.txt
          kill $(cat pid.txt)
          exit 0
          fi
          '''
        }
        }
    stage ('Deploy') {
      agent{label 'awsDeploy'}
      steps {
        keepRunning {
        sh '''#!/bin/bash
        pip install -r requirements.txt
        pip install gunicorn
        python3 -m gunicorn -w 4 application:app -b 0.0.0.0 --daemon
        '''
      }
    }
}
    stage ('Cypress Test') {
      steps {
        sh '''#!/bin/bash 
        cd ./cypress_test
        npx cypress run --spec ./cypress/e2e/test.cy.js
        '''
      }
     }
     
     stage ('Email') {
       steps {          
      mail(
            subject: "Jenkins Job Status Report '${env.JOB_NAME}' | Build #'${env.BUILD_NUMBER}'",
            body: "Check console output at http://34.207.131.116:8080/job/deployment3/job/main/${env.BUILD_NUMBER}/console",
            to: 'subornadnath@gmail.com'
          )
            }
      }
  }
 }
     
     
  }
 }

