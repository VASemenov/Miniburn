#!/usr/bin/env python
import sys


env_options = ['dev', 'prod', 'test']

syntax_err_msg = """
Usage: ./deploy.py [environment]

Environment options:
  -\t""" + "\n  -\t".join(env_options) + '\n'


if len(sys.argv) > 1:
    env = sys.argv[1]
else:
    print(syntax_err_msg)   
    exit()


if env not in env_options:
    print(syntax_err_msg)   
    exit()


# TODO: Deployment scripts for test, prod and dev environments
print(env)