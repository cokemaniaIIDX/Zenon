# Flaskのチュートリアルをやって基本を固める 2 - DB編

DBはDatastoreを使う予定なので飛ばし気味でいく

## DBへの接続

```py:db.py
import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext

def get_db():
  if 'db' not in g:
    g.db = sqlite3.connect(
      current_app.config['DATABASE'],
      detect_types=sqlite3.PARSE_DECLTYPES
    )
    g.db.row_factory = sqlite3.Row

  return g.db

def close_db():
  db = g.pop('db', None)

  if db is not None:
    db.clode()
```

- `g` : なんか特別なやつで リクエストごとにいろいろ役割があるっぽい？
  - `current_app`: これも特別なやつで リクエストに対して現在のFlaskアプリを指定する??
    - `app = Flask(__name__)`のコードは普通init以外で書かないからfactory関数以外の場所からアクセスできるFlaskアプリは基本的にないという意味←？
  - `sqlite3.connect()`: sqliteに接続している この時configのDATABASEへのコネクションを確立しているだけで、まだファイル自体は存在していない
  - `sqlite3.Row`: 列名による列へのアクセスを可能にする
- `close_db()`: g.dbが設定されているか調べて、connectionが作成済みかどうかを調べる
  - connectionが存在していた場合はそれを閉じる

## Table作成

```sql:schema.sql
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS post;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES user (id)
);
```

内容は見たらすぐわかるな！

これをdb.pyで読み込む

```py:db.py
def init_db():
  db = get_db()

  with current_app.open_resource('schema.sql') as f:
    db.executescript(f.read().decode('utf8'))

@click.command('init-db')
@with_appcontext
def init_db_command():
  init_db()
  click.echo('Initialized the database.')
```

- init_db(): get_db()を呼んでDBを選択、schema.sqlを読み込ませる
- init_db_command(): init_db()が成功したときにメッセージを表示する関数

## アプリへの登録

```py:db.py
def init_app(app):
  app.teardown_appcontext(close_db)
  app.cli.add_command(init_db_command)
```

よくわからん とりあえずこの関数をアプリ側から呼ぶ!

```py:__init__.py
import os

from flask import Flask


def create_app(test_config=None):
  app = # ... 略

  from . import db
  db.init_app(app)

  return app
```

## DB初期化

```
$ flask init-db
Initialized the database.
```

→ プロジェクトディレクトリに`instance`というディレクトリができていて、
その中に`flaskr.sqlite`ファイルが作成されていればOK