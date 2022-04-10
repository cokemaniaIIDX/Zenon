# Flaskのチュートリアルをやって基本を固める 6 - Project Installable編

作成したflaskアプリをインストール可能にする

## プロジェクトの記述

`setup.py`を作ってプロジェクトに関する内容を記述する

```py:setup.py
from setuptools import find_packages, setup

setup(
  name='flaskr',
  version='1.0.0',
  packages=find_packages(),
  include_package_data=True,
  zip_safe=False,
  install_requires=[
    'flask',
  ],
)
```

packagesについて、pythonパッケージに入っているようなもの(flask本体とか)は、find_packages()でpackageディレクトリを自動で見つけ出す
include_package_data で static とか template ディレクトリなどの、pythonでは提供されていない自作のデータを設定する
これは↓のMANIFEST.inファイルで指定して読み込ませるようにする

```in:MANIFEST.in
include flaskr/schema.sql
graft flaskr/static
graft flaskr/templates
global-exclude *.pyc
```

## プロジェクトインストール

setup.pyを見つけ出して、開発環境としてインストールしてみる

```
$ pip install -e .

$ pip list

Package             Version Editable project location
------------------- ------- -------------------------
Flask               2.0.3
flaskr              1.0.0   /home/coke/Zenon/back ←追加
```

これで、プロジェクトディレクトリ以外からでも`flask run`が実行できるようになる