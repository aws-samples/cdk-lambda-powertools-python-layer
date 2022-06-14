const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  authorName: 'Amazon Web Services',
  authorUrl: 'https://aws.amazon.com',
  authorOrganization: true,
  keywords: ['aws', 'cdk', 'powertools', 'python', 'layer', 'lambda', 'devax'],
  cdkVersion: '2.2.0',
  defaultReleaseBranch: 'main',
  majorVersion: 2,
  name: 'cdk-lambda-powertools-python-layer',
  repositoryUrl: 'https://github.com/aws-samples/cdk-lambda-powertools-python-layer.git',
  description: 'A lambda layer for AWS Powertools for python',
  devDeps: [
    '@types/prettier@2.6.0', // pin until breaking changes is resolved: https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/60310
  ],
  // depsUpgradeOptions: {
  //   ignoreProjen: false,
  //   workflowOptions: {
  //     labels: ['auto-approve', 'auto-merge'],
  //     secret: 'PROJEN_GITHUB_TOKEN',
  //   },
  // },
  github: false,
  mergify: true,
  publishToPypi: {
    distName: 'cdk-lambda-powertools-python-layer',
    module: 'cdk_lambda_powertools_python_layer',
  },
  // autoApproveOptions: {
  //   secret: 'AUTOMATION_TOKEN',
  //   allowedUsernames: ['am29d'],
  // },
  license: 'MIT-0',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
});

project.synth();