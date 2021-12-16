[![Netlify Status](https://api.netlify.com/api/v1/badges/d1ed1ecb-77d5-40e4-8e71-ab401126a32d/deploy-status)](https://app.netlify.com/sites/my-simple-todolist/deploys)

# TodoList
Todoリストアプリケーションです。Todoの登録と完了ができます。グラフやカレンダーによる視覚的な表示からTodo管理の継続化を促します。

<img width="1280" alt="スクリーンショット 2021-07-17 16 51 10" src="https://user-images.githubusercontent.com/55875685/126030257-96b35d4b-c12f-42a9-a853-eb03835ddb79.png">

## 作成した目的
継続的にTodo管理ができるようにアプリとして作成しました。

## アプリケーションURL
https://my-simple-todolist.netlify.app/login

ログイン画面の「ゲストログイン」ボタンからアプリを体験してみてください。ゲストログインではアカウント情報の変更とアカウントの削除が無効になっております。

## バックエンドリポジトリ
https://github.com/sky2432/todo-laravel

## 機能一覧
- レスポンシブ対応（スマートフォン・タブレット・PC）
- トークン認証
- ページネーション
- ユーザー・TodoのCRUD
- プロフィール画像の更新
- Todoの期限・リマインド日時の設定
- カレンダー上でのTodoの確認
- 継続日数をカレンダーで確認
- Todo完了数の推移グラフ表示（日別・週別・月別）
- メール通知（会員登録時・ログイン時・Todoのリマインド時・Todoの期限超過時）
- 管理者画面でのユーザーアカウント一覧とTodo一覧の確認

## 使用技術
フロントエンド
- HTML/CSS
- JavaScript
- Vue.js 2.6.14
- BootstrapVue 2.21.2

バックエンド
- PHP 7.3
- Laravel 8.47.0
- league/flysystem-aws-s3-v3 1.0.29
- Mysql 8.0.23

インフラ
- Netlify
- Heroku
- ClearDB MySQL(Heroku)
- AWS S3

## ER図
![Todo-list-ER](https://user-images.githubusercontent.com/55875685/126053239-f651fbcf-4282-4c66-a28b-3877bf4a8212.png)
