#### 概要
* フロントエンドからの入力をバックエンドで処理しDBに登録する習作
* バックエンド：ASP.NET.Core + MySQL + Docker
* フロントエンド：React + TypeScript

#### 実行
* backend
  * Visual StudioでDiary.Api.slnを起動
  * ソリューション構成 `Debug` , スタートアップアイテム `docker-compose` , `Docker Compose` を実行
  * 初回実行時はswaggerからmigrationを実行する
* frontend
  * `cd frontend`
  * `npm install`
  * `npm run dev`

#### その他
* backend
  * 要Docker Desktop
  * 初回migration時、MySqlデータのダウンロードが完了していない場合にエラーが発生しうる
  * mysql/data直下にDBデータの実体が作成される
* TimeZone
  * frontend: JST
  * backend: デフォルト(UTC)
