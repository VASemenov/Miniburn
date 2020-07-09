#!/usr/bin/env python
"""
Miniburn
Deployment manager

Author: Vladimir Semenov
"""

# import os
import sys
import subprocess


app_options = ['api', 'front']
env_options = ['prod', 'dev', 'test']

SYNTAX_ERR_MSG = """
Usage: ./deploy.py [environment]

Environment options:
  -\t""" + "\n  -\t".join(env_options) + '\n'


if len(sys.argv) == 3:
    app = sys.argv[1]
    env = sys.argv[2]
else:
    print(SYNTAX_ERR_MSG)
    sys.exit()


if env not in env_options or app not in app_options:
    print(SYNTAX_ERR_MSG)
    sys.exit()


if app == 'front':
    subprocess.run('pip install -r server/dependencies/prod.txt', shell=True, check=False)
    if env == ('dev' or 'test'):
        subprocess.run('pip install -r server/dependencies/dev.txt', shell=True, check=False)
        subprocess.run('rm server/config.cfg', shell=True, check=False)
        subprocess.run('cp server/configs/dev.cfg server/', shell=True, check=False)
        subprocess.run('mv server/dev.cfg server/config.cfg', shell=True, check=False)
    if env == 'test':
        subprocess.run('pip install -r server/dependencies/test.txt', shell=True, check=False)
    if env == 'prod':
        subprocess.run('rm server/config.cfg', shell=True, check=False)
        subprocess.run('cp server/configs/prod.cfg server/', shell=True, check=False)
        subprocess.run('mv server/prod.cfg server/config.cfg', shell=True, check=False)
    # if not os.path.exists('.env'):
    #     envfile =
    #     """ENVIRONMENT=
    #     MONGODB=miniburn
    #     MONGODB_HOST=localhost
    #     MONGODB_PORT=27010
    #     """
    #     subprocess.run('echo )
    