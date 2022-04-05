# Flaskのチュートリアルをやって基本を固める

## Helloアプリ

```py:__init__.py
import os
from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
```

1. `app = Flask(__name__)`: Flaskインスタンスを作成
   1. `__name__`はこの時点でのPythonのmodule名 appはpathの用意のために、appの場所を__name__から判断している
   2. `instance_relative_confi=True`を追加することで、設定ファイルが`インスタンスのフォルダ`から読み込むよっていうことをappに伝える
      `インスタンスフォルダ`は`flaskr`ディレクトリの外側に配置して、git管理しないような設定ファイルやsecret情報を格納する

2. `app.config.from_mapping()`: appが使用する標準設定をいくつか設定する
   1. SECRET_KEY  : djangoでもあったようなやつ devではとりあえず適当なわかりやすい値を入れているが、本番環境ではランダムな値にする
   2. DATABASE    : DBの指定 app.instance_pathのDBファイルを指定 (=flaskr/flaskr.sqlite?) ちょっとまだわからない

3. `app.config.from_pyfile()`: `config.py`がインスタンスフォルダにあれば、値をそこから取り出して標準設定を上書きする
   1. 例えば本番デプロイの時はSECRET_KEYを上書きする設定を追加するなど
   2. `test_config`もfactoryに渡すことができ、インスタンス設定の代わりに使用できる これはチュートリアルの最後のテストの時に多分もうちょっと詳しくわかる

4. `os.makedirs()`: app.instance_pathが確実に存在するようにするためのコード 
   1. Flaskはインスタンスフォルダを自動で作成しないので、DBファイルの保存フォルダを明示的に指定して作成する必要がある

5. `app.route()`: なんとなくでもうわかるけど `/(パス)`によって関数を返すルートを作成する

## Helloアプリ、起動！

この時点でFlaskアプリを起動できる
トップのディレクトリで実行する

```
$ export FLASK_APP=flaskr
$ export FLASK_ENV=development
$ flask run

 * Serving Flask app 'flaskr' (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 115-924-183
```

`http://127.0.0.1:5000/hello`にアクセス
→Hello, World! が表示されればOK