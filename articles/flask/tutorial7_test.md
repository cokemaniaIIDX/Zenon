# Flaskのチュートリアルをやって基本を固める 7 - test編

単体テストを行って、アプリが想定通りに動くことを確認する

## テスト用ライブラリインストール

```
$ pip install pytest coverage
```

## 準備

testsディレクトリを作成してテスト用ファイルを作成

まず、ダミーデータを挿入するクエリを作成

```sql:data.sql
INSERT INTO user (username, password)
VALUES
  ('test', 'pbkdf2:sha256:50000$TCI4GzcX$0de171a4f4dac32e3364c7ddc7c14f3e2fa61f2d17574483f7ffbb431b4acb2f'),
  ('other', 'pbkdf2:sha256:50000$kJPKsz6N$d2d4784f1b030a9761f5ccaeeaca413f27f2ecb76d6168407af962ddce849f79');

INSERT INTO post (title, body, author_id, created)
VALUES
  ('test title', 'test' || x'0a' || 'body', 1, '2022^04-10 00:00:00');
```

テスト用のアプリとDBを作成するような設定pyを作成

```py:conftest.py
import os
import tempfile

import pytest
from flaskr import create_app
from flaskr.db import get_db, init_db

with open(os.path.join(os.path.dirname(__file__), 'data.sql'), 'rb') as f:
  _data_sql = f.read().decode('utf8')


@pytest.fixture
def app():
  db_fd, db_path = tempfile.mkstemp()

  app = create_app({
    'TESTING': True,
    'DATABASE': db_path,
  })

  with app.app_context():
    init_db()
    get_db().executescript(_data_sql)

  yield app

  os.close(db_fd)
  os.unlink(db_path)


@pytest.fixture
def client(app):
  return app.test_client()


@pytest.fixture
def runner(app):
  return app.test_cli_runner()
```

- tempfile.mkstemp() : 一時的にファイルディスクリプタとパスを返す関数
  - 一時的にDATABASEを書き換えて、一時ファイルにテストデータを書き込むようにする
- fixture, client: app関数のfixtureによって作成されたアプリケーションのオブジェクトを使ってtest_client()を呼ぶらしい
  - テストではサーバを実行させずにアプリへのリクエストを作成するらしい
  - 正直やってみないと全くわからん

## factoryのテスト用ファイル作成

```py:test_factory.py
from flaskr import create_app

def test_config():
  assert not create_app().testing
  assert create_app({'TESTING': True}).testing

def test_hello(client):
  response = client.get('/hello')
  assert response.data == b'Hello, World!'
```

/helloで Hello, World!が返ってくるかどうかをテスト

## DBのテスト用ファイル

```py:test_db.py
import sqlite3

import pytest
from flaskr.db import get_db

def test_get_close_db(app):
  with app.app_context():
    db = get_db()
    assert db is get_db()

  with pytest.raises(sqlite3.ProgrammingError) as e:
    db.execute('SELECT 1')

  assert 'closed' in str(e.value)
```

contextの中で、get_dbが呼び出されればconnectonを返して、context終了後はconnectionが閉じられていることをテスト

```py:test_db.py
def test_init_db_command(runnser, monkeypatch):
  class Recorder(object):
    called = False

  def fake_init_db():
    Recorder.called = True

  monkeypatch.setattr('flaskr.db.init_db', fake_init_db)
  result = runnser.invoke(args=['init-db'])
  assert 'Initialized' in result.output
  assert Recorder.called
```

init-dbコマンドでinit_db()関数が実行されてメッセージ出力することをテスト

## 認証のテスト作成

```py:conftest.py
class AuthActions(object):
  def __init__(self, client):
    self._client = client

  def login(self, username='test', password='test'):
    return self._client.post(
      '/auth/login',
      data={'username': username, 'password': password}
    )

  def logout(self):
    return self._client.get('/auth/logout')

@pytest
def auth(client):
  return AuthActions(client)
```

```py:test_auth.py
import pytest
from flask import g, session
from flaskr.db import get_db

def test_register(client, app):
  assert client.get('/auth/register').status_code == 200
  response = client.post(
    '/auth/register', data={'username': 'a', 'password': 'a'}
  )
  assert 'http://localhost/auth/login' == response.headers['Location']

  with app.app_context():
    assert get_db().execute(
      "select * from user where username = 'a'",
    ).fetchone() is not None

@pytest.mark.parametrize(('username', 'password', 'message'), (
  ('', b'Username is required.'),
  ('a', b'Password is required.'),
  ('test', 'test', b'already registered.'),
))
def test_register_validate_input(client, username, password, message):
  response = client.post(
    '/auth/register',
    data={'username': username, 'password': password}
  )
  assert message in response.data
```

- get で 200 コードが返されて、ページが正しく表示できることをテスト
- 同様に、postでdataの情報を元にregisterを実行してうまくいくかをテスト
  - registerでは、登録後リダイレクトが起こるので、headersの`Location`ヘッダを参照して正しく(/loginへ)リダイレクトされているかを確認
- @mark.parametrize : 同じテスト関数を違う引数で走らせるように指定する 複数のダミーデータで試すときに使える