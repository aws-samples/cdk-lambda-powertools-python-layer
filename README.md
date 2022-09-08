# Lambda powertools python layer

## ⚠️ This repository is archived: use the new repository to submit issues and follow updates: https://github.com/awslabs/cdk-aws-lambda-powertools-layer


## Why this project exists

This is a custom construct that will create AWS Lambda Layer with AWS Powertools for Python library. There are different
ways how to create a layer and when working with CDK you need to install the library, create a zip file and wire it
correctly. With this construct you don't have to care about packaging and dependency management, just create a construct
and add it to your function. The construct is an extension of the
existing [`LayerVersion`](https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-lambda.LayerVersion.html) construct
from the CDK library, so you have access to all fields and methods.

See the [API](API.md) for details.

```typescript
import { LambdaPowertoolsLayer } from 'cdk-lambda-powertools-python-layer';

const powertoolsLayer = new LambdaPowertoolsLayer(this, 'TestLayer');
```

Python

```python
from cdk_lambda_powertools_python_layer import LambdaPowertoolsLayer

powertoolsLayer = LambdaPowertoolsLayer(self, 'PowertoolsLayer')
```

The layer will be created during the CDK `synth` step and thus requires Docker.

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

### Python

A single line will create a layer with powertools for python:

```python
from cdk_lambda_powertools_python_layer import LambdaPowertoolsLayer

powertoolsLayer = LambdaPowertoolsLayer(self, 'PowertoolsLayer')
```

You can then add the layer to your funciton:

```python
from aws_cdk import aws_lambda

aws_lambda.Function(self, 'LambdaFunction',
                            code=aws_lambda.Code.from_asset('function'),
                            handler='app.handler',
                            runtime=aws_lambda.Runtime.PYTHON_3_9,
                            layers=[powertoolsLayer])
```

You can specify the powertools version by passing the optional `version` paramter, otherwise the construct will take the
latest version from pypi repository.

```python
LambdaPowertoolsLayer(self, 'PowertoolsLayer', version='1.24.0')
```

Additionally, powertools have extras depenedncies such as
Pydantic, [documented here](https://awslabs.github.io/aws-lambda-powertools-python/latest/#lambda-layer). This is not
included by default, and you have to set this option in the construct definition if you need it:

```python
LambdaPowertoolsLayer(self, 'PowertoolsLayer', include_extras=True)
```

Full example:

```python
from aws_cdk import Stack, aws_lambda
from cdk_lambda_powertools_python_layer import LambdaPowertoolsLayer
from constructs import Construct


class LayerTestStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        
        powertoolsLayer = LambdaPowertoolsLayer(
            self, 'PowertoolsLayer', include_extras=True, version='1.24.0')

        aws_lambda.Function(self, 'LambdaFunction',
                            code=aws_lambda.Code.from_asset('function'),
                            handler='app.handler',
                            runtime=aws_lambda.Runtime.PYTHON_3_9,
                            layers=[powertoolsLayer])

```

### TypeScript 

Full example for TypeScript:

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

