# Flaskのチュートリアルをやって基本を固める 5 - Blog Blueprint編

認証済みユーザのみ投稿できるようにして、投稿の作者が編集・削除できるようにする

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

```