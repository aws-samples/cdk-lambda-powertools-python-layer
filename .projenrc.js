const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Alexander Melnyk (am29d)',
  authorAddress: 'amelnyk@amazon.de',
  keywords: ['aws', 'cdk', 'powertools', 'python', 'layer', 'lambda', 'devax'],
  cdkVersion: '2.2.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-lambda-powertools-python-layer',
  repositoryUrl: 'https://github.com/amelnyk/cdk-lambda-powertools-python-layer.git',
  description: 'A lambda layer for AWS Powertools for python',
  workflowNodeVersion: '14',
});


project.synth();