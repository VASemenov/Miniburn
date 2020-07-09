import os
import tempfile

import pytest

from .. import app


@pytest.fixture(scope='module')
def client():
    app.app.config['TESTING'] = True

    with app.app.test_client() as client:
        yield client

def test_hosts_angular(client):
    """Returns Angular app"""

    rv = client.get('/')
    assert b'<app-root>' in rv.data