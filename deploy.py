#!/usr/bin/env python
import sys
import subprocess


app_options = ['api', 'front']
env_options = ['prod', 'dev', 'test']

syntax_err_msg = """
Usage: ./deploy.py [environment]

Environment options:
  -\t""" + "\n  -\t".join(env_options) + '\n'


if len(sys.argv) == 3:
    app = sys.argv[1]
    env = sys.argv[2]
else:
    print(syntax_err_msg)   
    exit()


if env not in env_options or app not in app_options:
    print(syntax_err_msg)   
    exit()


# TODO: Deployment scripts for test, prod environments
# print(app, env)

if app == 'front':
    subprocess.run('pip install -r server/dependencies/prod.txt', shell=True)
    if env == ('dev' or 'test'):
        subprocess.run('pip install -r server/dependencies/dev.txt', shell=True)
    if env == 'test':
        subprocess.run('pip install -r server/dependencies/test.txt', shell=True)
    