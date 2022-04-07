# Flaskのチュートリアルをやって基本を固める 3 - View編

## BluePrintの作成

`blueprint`とは、viewとかその他のコードをグループへと編成するやつ
view関数を直接Flaskアプリに登録するんじゃなくて、まずblueprintに登録して、
それからfactory関数の中でFlaskアプリが利用可能になったときにblueprintをFlaskアプリに登録する

よくわからんのでとりあえず作っていく

```py:auth.py
import functools

from flask import (
  Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkseug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')
```

`auth`という名前の`blueprint`を作成した
これは後でユーザ登録とかのviewを持つようにする

blueprintはflaskアプリのオブジェクトと同じように、__name__で自分がどこで定義されているかを指定する
url_prefixを指定することで、blueprintと関連したURLのパスが先頭につけられる

bpを作成したら、factoryからimportして登録する

```py:__init__.py
def create_app(test_config=None):
  app = Flask(__name__, instance_relative_config=True)
  # .. 略 ..

  from . import auth
  app.register_blueprint(auth.bp)

  return app
```

## view登録 : register

`/auth/register`でアクセスされたときに`register`ようのページを返すviewを作る

```py:auth.py
@bp.route('/register', methods=('GET', 'POST'))
def register():
  username = request.form['username']
  password = request.form['password']
  db = get_db()
  error = None

  if not username:
    error = 'Username is required.'
  elif not password:
    error = 'Password is required.'
  elif db.execute(
    'SELECT id FROM user WHERE username = ?', (username,)
  ).fetchone() is not None:
    error = f"User {username} is already registered."

  if error is None:
    db.execute(
      'INSERT INTO user (username, password) VALUES (?, ?)',
      (username, generate_password_hash(password))
    )
    db.commit()
    return redirect(url_for('auth.login'))
  flash(error)

  return render_template('auth/register.html')
```

- ? と (value)で対になってる valueが?に入る
- fetchone(): クエリ結果から1行を返す 何もなければNoneを返す 全部返すのはfetchall() あとで出てくるらしい
- passwordは平文で保存しないように、generate_password_hash()でハッシュ化してから保存する
- flash(): 検証が失敗したときに呼び出す エラーをユーザへ表示する関数

## view登録 : login

次は`login`
ほぼregisterと一緒

```py:auth.py
@bp.route('/login', methods=('GET', 'POST'))
def login():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    db = get_db()
    error = None
    user = db.execute(
      'SELECT * FROM user WHERE username = ?', (username,)
    ).fetchone()

    if user is None:
      error = 'Incorrect username.'
    elif not check_password_hash(user['password'], password):
      error = 'Incerrect password.'

    if error is None:
      session.clear()
      session['user_id'] = user['id']
      return redirect(url_for('index'))

    flash(error)
  return render_template('auth/login.html')
```

userの認証ができたら、`session`dictにuseridを保存する
これはブラウザへ送信されるcookieの中身である

これ以降、ほかのリクエストでこの変数が利用できるので、
他のviewでもuseridが利用可能になる

## ログインユーザ確認

```py:auth.py
@bp.before_app_request
def load_logged_in_user():
  user_id = session.get('user_id')

  if user_id is None:
    g.user = None
  else:
    g.user = get_db().execute(
      'SELECT * FROM user WHERE id = ?', (user_id,)
    ).fetchone()
```

どのURLがリクエストされたかにかかわらずview関数の前に実行する関数を登録する
これでsessionに格納されているuser_idを持ってきて、g.userに格納する

## view登録 : logout

ログアウトは session の中身を消せばOK

```py:auth.py
@bp.route('/logout')
def logout():
  session.clear()
  return redirect(url_for('index'))
```

## ログイン判定

decoratorで関数をwrapすることでログインチェックをする

```py:auth.py
def login_required(view):
  @functools.wraps(view)
  def wrapped_view(**kwargs):
    if g.user is None:
      return redirect(url_for('auth.login'))
    
    return view(**kwargs)
  
  return wrapped_view
```

- redirect(url_for()): auth.login とすることで auth.py の login() のパスを取得してそこにリダイレクトする