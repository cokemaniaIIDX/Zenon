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

```py:test_auth.py
def test_login(client, auth):
  assert client.get('/auth/login').staticu_code == 200
  response = auth.login()
  assert response.headers['Location'] == 'http://localhost/'

  with client:
    client.get('/')
    assert session['user_id'] == 1
    assert g.user['username'] == 'test'

@pytest.mark.parametrize(('username', 'password', 'message'), (
  ('a', 'test', b'Incorrect username.'),
  ('test', 'a', b'Incorrect password.'),
))
def test_login_validate_input(auth, username, password, message):
  response = auth.login(username, password)
  assert message in response.data
```

ログインのほうは登録とほぼ同じ

ログアウトはログインの逆を調べる ログアウト後はsessionの中にuser_idは含まれないはずなので、それを確認する

```py:test_auth.py
def test_logout(client, auth):
  auth.login()

  with client:
    auth.logout()
    assert 'user_id' not in session
```

## blogのテスト

```py:test_blog.py
import pytest
from flaskr.db import get_db

def test_index(client, auth):
  response = client.get('/')
  assert b"Log In" in response.data
  assert b"Register" in response.data

  auth.login()
  response = client.get('/')
  assert b'Log Out' in response.data
  assert b'test title' in response.data
  assert b'by test on 2022-04-12' in response.data
  assert b'test\nbody' in response.data
  assert b'href="/1/update"' in response.data
```

未ログイン状態ではログインとRegisterがレスポンスに入っていることをテスト
ログイン後は、Logoutとかtest用Postが登録されていることを確認

```py:test_blog.py
@pytest.mark.parametrize('path', (
  '/create',
  '/1/update',
  '/1/delete',
))
def test_login_required(client, path):
  response = client.post(path)
  assert response.headers['Location'] == 'http://localhost/auth/login'

def test_authr_required(app, client, auth):
  with app.app_context():
    db = get_db()
    db.execute('UPDATE post SET author_id = 2 WHERE id = 1')
    db.commit()

  auth.login()
  assert client.post('/1/update').status_code == 403
  assert client.post('/1/delete').status_code == 403
  assert b'href="/1/update' not in client.get('/').data

@pytest.mark.parametrize('path', (
  '/2/update',
  '/2/delete',
))
def test_exists_required(client, auth, path):
  auth.login()
  assert client.post(path).status_code == 404
```

id = 1 のpostの author_id を 2に変えて、 post 1 の author が 2 の状態の時、
author_id 1 の test user は、 post 1 に change, delete の処理ができないはずなので、
status_code 403 が返ることを確認する

post 2 の投稿は存在しないので、404が返ることを確認する

```py:test_blog.py
def test_create(client, auth, app):
  auth.login()
  assert client.get('/create').status_code == 200
  client.post('/create', data={'title': 'created', 'body': ''})

  with app.app_context():
    db = get_db()
    count = db.execute('SELECT COUNT(id) FROM post').fetchone()[0]
    assert count == 2

def test_update(client, auth, app):
  auth.login()
  assert client.get('/1/update').status_code == 200
  client.post('/1/update', data={'title': 'updated', 'body': ''})

  with app.app_context():
    db = get_db()
    post = db.execute('SELECT * FROM post WHERE id = 1').fetchone()
    assert post['title'] == 'updated'

@pytest.mark.parametrize('path', (
  '/create',
  '/1/update',
))
def test_create_update_validate(client, auth, path):
  auth.login()
  response = client.post(path, data={'title': '', 'body': ''})
  assert b'Title is required.' in response.data
```

/create, /post でアクセスされたとき、200 が返ってくることを確認
createが実行された場合、今postは1なので、正常に作成された後、 2 になっているはず
updateが実行された場合、タイトルが'updated'に変更されているはず
titleが''の場合エラーになるはず
↑を確認

```py:test_blog.py
def test_delete(client, auth, app):
  auth.login()
  response = client.post('/1/delete')
  assert response.headers['Location'] == 'http://localhost/'

  with app.app_context():
    db = get_db()
    post = db.execute('SELECT * FROM post WHERE id = 1').fetchone()
    assert post is None
```

deleteが実行された場合、
ページはindex に戻っているはずで、
post id 1 の投稿は消えているはずであることを確認

# テストの実行

(option)テストの実行時、テストメッセージの出力が多すぎないようにする設定を追加しておく

```cfg:setup.cfg
[tool:pytest]
testpaths = tests

[coverage:run]
branch = True
source =
  flaskr
```

## テスト実行

`$ pytest`で実行できる

```
(zenon) [coke@imade-gcp01 back]$ pytest
==== test session starts ======
platform linux -- Python 3.6.8, pytest-7.0.1, pluggy-1.0.0
rootdir: /home/coke/Zenon/back, configfile: setup.cfg, testpaths: tests
collected 24 items                                                                                                                                                                               

tests/test_auth.py ........                                                                                                                                                                [ 33%]
tests/test_blog.py ............                                                                                                                                                            [ 83%]
tests/test_db.py ..                                                                                                                                                                        [ 91%]
tests/test_factory.py ..                                                                                                                                                                   [100%]

===== 24 passed in 1.28s =====
```

### エラー

- conftest.pyの名前間違い

`fixture 'client' not found` とでた
どうやらfixtureを読み込んでなさげ
  → conftest.py が confteset.py になってた
  → conftest.pyに直すと動いた

- db の入力エラー

data.sqlに入れるテストデータのフォーマットがミスってた

```
VALUES
  ('test title', 'test' || x'0a' || 'body', 1, '2022^04-12 00:00:00'); ←2022^04 になってる
```

これを直すと動いた

- 単純なタイプミス

```
@pytest.mark.parametrize(('username', 'password', 'message'), (
      ('a', 'test', b'Incorrect username.'),
      ('test', 'a', b'Incorrect password.'),
    ))
    def test_login_validate_input(auth, username, password, message):
      response = auth.login(username, password)
>     assert message in response.data
E     assert b'Incorrect password.' in b'<!DOCTYPE html>\n<title>Log In - Flaskr</title>\n<link rel="stylesheet" href="/static/style.css">\n<nav>\n  <h1>Flas...="password" name="password" id="password" required>\n    <input type="submit" value="Log In">\n  </form>\n\n</section>'
E      +  where b'<!DOCTYPE html>\n<title>Log In - Flaskr</title>\n<link rel="stylesheet" href="/static/style.css">\n<nav>\n  <h1>Flas...="password" name="password" id="password" required>\n    <input type="submit" value="Log In">\n  </form>\n\n</section>' = <WrapperTestResponse 663 bytes [200 OK]>.data

tests/test_auth.py:45: AssertionError
```

Incorrect password. が返ってくるはずというてすと

auth.py の当該分をコピペして比較すると、 Inc**e**recct passwordになってた pytestすげえ！