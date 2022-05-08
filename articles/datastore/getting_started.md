# Python で Datastore SDK を利用する

FlaskでDatastoreを利用するために、
環境にDatastoreSDKをセットアップする

## 手順

例によって[公式手順](https://cloud.google.com/datastore/docs/reference/libraries#client-libraries-install-python)を参考にする

### 1. クライアントライブラリをインストールする

```sh
仮想環境がある場合は仮想環境に入る
$ source venv/bin/activate

(venv) $ pip install --upgrade google-cloud-datastore

(venv) $ pip list | grep datastore
google-cloud-datastore   2.5.1
```

### 2. 認証用サービスアカウントを作成する

Terraformにて作成

- ID   : datastore-sdk
- role : roles/datastore.user

公式手順はOwner権限を付与しているが過剰なので
datastore.userを利用することにする

```tf:service_accounts.tf
module "service_account_for_datastore" {
  source       = "../modules/gcp/service_accounts"
  account_id   = "datastore-sdk"
  display_name = "datastore-sdk-service-account"
  description  = "Service Account for Datastore SDK"
  roles = [
    "roles/datastore.user"
  ]
}
```

### 3. 鍵発行

```
$ PROJECT_ID="自身のGCPプロジェクトID"
$ gcloud iam service-accounts keys create datastore-key.json \
  --iam-account=datastore-sdk@${PROJECT_ID}.iam.gserviceaccount.com
```

↑コマンドを実行したディレクトリに`datastore-key.json`がDLされているので、
安全な場所に移動する

```
$ mkdir .credentials
$ mv datastore-key.json .credentials
```

### 4. 環境変数設定

発行した鍵へのパスを環境変数として登録する

```
$ export GOOGLE_APPLICATION_CREDENTIALS="/home/user/.credentials/datastore-key.json"
```

### 5. 使ってみる

実際にDatastoreにエンティティを挿入してみる

```
$ touch db.py
```

```py
from google.cloud import datastore

datastore_client = datastore.Client()

kind = "Task"
name = "sampletask1"
task_key = datastore_client.key(kind, name)

task = datastore.Entity(key=task_key)
task["description"] = "Buy milk"

datastore_client.put(task)

print(f"Saved {task.key.name}: {task['description']}")
```

- 実行

```
$ python db.py 
Saved sampletask1: Buy milk
```

- 確認

コンソールで確認してみると、作成されていることが分かる

![datastore.png](datastore.png)