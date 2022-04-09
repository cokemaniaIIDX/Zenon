# Flaskのチュートリアルをやって基本を固める 5 - Blog Blueprint編

認証済みユーザのみ投稿できるようにして、投稿の作者が編集・削除できるようにする

## blog.py作成

```py:blog.py
from flask import (
  Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from flaskr.auth import login_required
from flaskr.db import get_db

bp = Blueprint('blog', __name__)
```

blogのblueprintを作成

```py:__init__.py
  from . import blog
  app.register_blueprint(blog.bp)
  app.add_url_rule('/', endpoint='index')
```

blogはこのアプリのコアなので、indexとする
prefixもなし

## indexの作成

indexは投稿記事をすべて表示する

```py:blog.py
@bp.route('/')
def index():
  db = get_db()
  posts = db.execute(
    'SELECT p.id, title, body, created, author_id, username'
    ' FROM post p JOIN user u ON p.author_id = u.id'
    ' ORDER BY created DESC'
  ).fetchall()
  return render_template('blog/index.html', posts=posts)
```

## 作成、更新

```py:blog.py
@bp.route('/create', methods=('GET', 'POST'))
@login_required
def create():
  if request.method == 'POST':
    title = request.form['title']
    body = request.form['body']
    error = None

    if not title:
      error = 'Title is required.'

    if error is not None:
      flash(error)
    else:
      db = get_db()
      db.execute(
        'INSERT INTO post (title, body, author_id)'
        'VALUES (?, ?, ?)',
        (title, body, g.user['id'])
      )
      db.commit()
      return redirect(url_for('blog.index'))

  return render_template('blog/create.html')

def get_post(id, check_author=True):
  post = get_db().execut(
    'SELECT p.id, title, body, created, author_id, username'
    ' FROM post p JOIN user u ON p.author_id = u.id'
    ' WHERE p.id = ?',
    (id,)
  ).fetchone()

  if post is None:
    abort(404, f"Post id {id} doesn't exist.")

  if check_author and post['author_id'] != g.user['id']:
    abort(403)

  return post

@bp.route('/<int:id>/update', methods=('GET', 'POST'))
@login_required
def update(id):
  post = get_post(id)

  if request.method == 'POST':
    title = request.form['title']
    body = request.form['body']
    error = None

    if not title:
      error = 'Title is required.'

    if error is not None:
      flash(error)
    else:
      db = get_db()
      db.execute(
        'UPDATE post SET title = ?, body = ?'
        ' WHERE id = ?',
        (title, body, id)
      )
      db.commit()
      return redirect(url_for('blog.index'))
  
  return render_template('blog/update.html', post=post)
```

## 消去

deleteはテンプレートなしでOK
`/<id>/delete`のurlで投稿を削除

```py:blog.py
@bp.route('/<int:id>/delete', methods=('POST'))
@login_required
def delete(id):
  get_post(id)
  db = get_db()
  db.execute('DELETE FROM post WHERE id = ?', (id,))
  db.commit()
  return redirect(url_for('blog.index'))
```