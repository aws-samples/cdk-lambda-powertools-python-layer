# Lambda powertools python layer

## Why this project exists
This is a custom construct that will create AWS Lambda Layer with AWS Powertools for Python library. 
There are different ways how to create a layer and when working with CDK you need to install the library, create a zip file and wire it correctly.
With this construct you don't have to care about packaging and dependency management, just create a construct and add it to your function.
The construct is an extension of the existing [`LayerVersion`](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.LayerVersion.html) construct from the CDK library, so you have access to all fields and methods.

```typescript
import { LambdaPowertoolsLayer } from 'cdk-lambda-powertools-python-layer';

const powertoolsLayer = new LambdaPowertoolsLayer(this, 'TestLayer');
```

## How to test

This module is not published yet, therefore you need to install few tools to test it. 
This section will be deleted after the construct is released to a public repository.

### Requirements

* cdk v2
* docker
* npm or yarn, whatever you prefer

### Build construct

After you have checked out the repo:

```shell
npm i
npm run build
```

This will create a tgz file in `dist/js` directory. You can copy this file to your test project then install this module
with

```shell
npm i file:PATH_TO_PACKAGE/cdk-lambda-powertools-python-layer@0.0.0.jsii.tgz
```

## Install

TypeSript/JavaScript:

```shell
npm i cdk-lambda-powertools-python-layer
```

Python:

```shell
pip install cdk-lambda-powertools-python-layer
```

## Usage

A single line will create a layer with powertools for python:

```typescript
import { LambdaPowertoolsLayer } from 'cdk-lambda-powertools-python-layer';

const powertoolsLayer = new LambdaPowertoolsLayer(this, 'TestLayer', {
  version: '1.22.0',
});
```

You can then add the layer to your funciton:

```typescript
new Function(this, 'LambdaFunction', {
  code: Code.fromAsset(path.join('./function')),
  handler: 'app.handler',
  runtime: Runtime.PYTHON_3_9,
  layers: [powertoolsLayer],
});
```

You can specify the powertools version by passing the optional `version` paramter, otherwise the construct will take the latest
version from pypi repository.

```typescript
new LambdaPowertoolsLayer(this, 'PowertoolsLayer', {
  version: '1.21.0'
});
```

Additionally, powertools have extras depenedncies such as Pydantic, [documented here](https://awslabs.github.io/aws-lambda-powertools-python/latest/#lambda-layer). 
This is not included by default, and you have to set this option in the construct definition if you need it:

```typescript
new LambdaPowertoolsLayer(this, 'PowertoolsLayer', {
  includeExtras: true
});
```

Full example:

```typescript
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaPowertoolsLayer } from 'cdk-lambda-powertools-python-layer';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CdkPowertoolsExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const powertoolsLayer = new LambdaPowertoolsLayer(this, 'TestLayer', {
      version: '1.22.0',
      includeExtras: true
    });

    new Function(this, 'LambdaFunction', {
      code: Code.fromAsset(path.join('./function')),
      handler: 'app.handler',
      runtime: Runtime.PYTHON_3_9,
      layers: [powertoolsLayer],
    });
  }
}

```
