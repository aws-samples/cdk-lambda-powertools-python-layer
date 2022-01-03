FROM public.ecr.aws/lambda/python:3.8



ARG PACKAGE_SUFFIX=''

USER root
WORKDIR /tmp


# PACKAGE_SUFFIX = '[pydantic]==1.23.0'
# PACKAGE_SUFFIX = '[pydantic]'
# PACKAGE_SUFFIX = '=='1.23.0'
# PACKAGE_SUFFIX = ''


RUN yum update -y && yum install -y zip unzip wget tar gzip

RUN pip install -t /python aws-lambda-powertools$PACKAGE_SUFFIX


RUN mkdir -p /asset
RUN zip -qr /asset/layer.zip /python --exclude \*/tests/\* \*/doc/\* \*/__pycache__/\* \*.pyc
