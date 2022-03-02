import * as path from 'path';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * Properties for Powertools layer for python.
 */
export interface PowertoolsLayerProps {
  /**
   * The powertools package version from pypi repository.
   */
  readonly version?: string;
  /**
   * A flag for the pydantic extras dependency, used for parsing.
   * This will increase the size of the layer significantly. If you don't use parsing, ignore it.
   */
  readonly includeExtras?: boolean;

  /**
   * the name of the layer, will be randomised if empty
   */
  readonly layerVersionName?: string;
}

/**
 * Defines a new Lambda Layer with Powertools for python library.
 */
export class LambdaPowertoolsLayer extends lambda.LayerVersion {


  /**
   * creates build argument for the Dockerfile.
   * There are multiple combinations between version and extras package that results in different suffix for the installation.
   * With and without version, with and without extras flag.
   * We construct one suffix here because it is easier to do in code than inside the Dockerfile with bash commands.
   * For example, if we set extras=true and version=1.22.0 we get '[pydantic]==1.22.0'.
   *
   */
  static constructBuildArgs(includeExtras: boolean | undefined, version: string | undefined): string {
    let suffix = '';
    if (includeExtras) {
      suffix = '[pydantic]';
    }
    if (version) {
      suffix = `${suffix}==${version}`;
    }
    return suffix;
  }


  constructor(scope: Construct, id: string, props?: PowertoolsLayerProps) {
    super(scope, id, {
      code: lambda.Code.fromDockerBuild(path.join(__dirname, '../layer'), {
        buildArgs: {
          PACKAGE_SUFFIX: LambdaPowertoolsLayer.constructBuildArgs(props?.includeExtras, props?.version),
        },
      }),
      layerVersionName: props?.layerVersionName ? props?.layerVersionName : undefined,
      license: 'MIT-0',
      compatibleRuntimes: [
        lambda.Runtime.PYTHON_3_6,
        lambda.Runtime.PYTHON_3_7,
        lambda.Runtime.PYTHON_3_8,
        lambda.Runtime.PYTHON_3_9,
      ],
      description: `Lambda Powertools for Python${props?.includeExtras ? ' with Pydantic' : ''} ${props?.version ? `version ${props.version}` : 'latest version'}`.trim(),
    });
  };

}
