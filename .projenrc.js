const {
  awscdk,
  License,
} = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  authorName: 'Alexander Melnyk',
  authorOrganization: true,
  keywords: ['aws', 'cdk', 'powertools', 'python', 'layer', 'lambda', 'devax'],
  cdkVersion: '2.2.0',
  defaultReleaseBranch: 'main',
  majorVersion: '2',
  name: 'cdk-lambda-powertools-python-layer',
  repositoryUrl: 'https://github.com/aws-samples/cdk-lambda-powertools-python-layer.git',
  description: 'A lambda layer for AWS Powertools for python',
  github: false,
  publishToPypi: {
    distName: 'cdk-lambda-powertools-python-layer',
    module: 'cdk_lambda_powertools_python_layer',
  },
  license: 'MIT-0',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  catalog: {
    twitter: 'am29d',
    announce: false,
  },
});

project.synth();