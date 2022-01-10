const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  authorName: 'Alexander Melnyk',
  keywords: ['aws', 'cdk', 'powertools', 'python', 'layer', 'lambda', 'devax'],
  cdkVersion: '2.2.0',
  defaultReleaseBranch: 'main',
  majorVersion: '0',
  name: 'cdk-lambda-powertools-python-layer',
  repositoryUrl: 'https://github.com/amelnyk/cdk-lambda-powertools-python-layer.git',
  description: 'A lambda layer for AWS Powertools for python',
  github: false,
  publishToPypi: {
    distName: 'cdk-lambda-powertools-python-layer',
    module: 'cdk_lambda_powertools_python_layer',
  },
  catalog: {
    twitter: 'am29d',
    announce: false,
  },
  licensed: false,
});


project.synth();