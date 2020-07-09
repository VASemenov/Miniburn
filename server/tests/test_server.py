# pylint: disable=duplicate-code
"""
Miniburn frontend server tests
"""

import pytest
from .. import app


@pytest.fixture(scope='module')
def client():
    """Server fixture"""
    app.app.config['TESTING'] = True

    with app.app.test_client() as client_app:
        yield client_app


def test_hosts_angular(client): # pylint: disable=W0621
    """Returns Angular app"""

    response = client.get('/')
    assert b'<app-root>' in response.data
