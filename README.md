# TodoList
Todoリストアプリケーションです。グラフやカレンダーによる視覚的な表示からTodo管理の継続化を促します。レスポンシブに対応しているためPC・タブレット・スマートフォンにて利用可能です。

このアプリはフロントエンドとバックエンドでリポジトリが分かれています。こちらはフロントエンドのリポジトリであり、バックエンドは下記のリポジトリになります。アプリの説明はバックエンド含めこちらのリポジトリで行っております。

https://github.com/sky2432/todo-laravel

## アプリケーションURL
https://my-simple-todolist.netlify.app/

ログイン画面の「ゲストログイン」ボタンからアプリを体験してみてください。ゲストログインではアカウント情報の変更とアカウントの削除が無効になっております。

## 機能一覧
- ログイン・ログアウト
- ゲストログイン
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
- Vue.js 2.6.11
- BootstrapVue 2.21.2
- Netlify

バックエンド
- PHP 7.3
- Laravel 8.12
- AWS S3
- Heroku
- Mysql 8.0.23
- ClearDB MySQL(Heroku)

## ER図
![Todo-list-ER](https://user-images.githubusercontent.com/55875685/126053239-f651fbcf-4282-4c66-a28b-3877bf4a8212.png)

## アカウントの種類
- ユーザー: Todoの管理ができます。
- 管理者: ユーザーアカウント一覧とユーザーのTodo一覧を確認できます。
- ゲストユーザー: 会員登録することなくユーザーアカウントとしてアプリを体験することができます。

## 使い方
レスポンシブに対応していますが、ここではPC画面での説明になります。

### ホーム画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 51 10" src="https://user-images.githubusercontent.com/55875685/126030257-96b35d4b-c12f-42a9-a853-eb03835ddb79.png">
まず登録したTodo一覧の確認とTodoの登録・変更が可能です。またそれぞれのTodoの横にあるチェックボックスを押すことでTodoを完了済みにすることができます。期限が過ぎているTodoは赤色で表示されます。
<img width="1280" alt="スクリーンショット 2021-07-17 16 51 33" src="https://user-images.githubusercontent.com/55875685/126030264-868a5a0b-2e57-4c1d-ab5b-80eea55ed9b5.png">
Todoには期限とリマインド日時を設定することもできます。

### 完了済みTodo一覧画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 51 48" src="https://user-images.githubusercontent.com/55875685/126030275-7ca21c41-fa26-477f-95d4-cb8d9d468cf0.png">
完了済みにしたTodoが一覧で表示されています。こちらの画面ではTodoの削除とTodoの完了済みを取り消しホーム画面に戻すことができます。

### カレンダー画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 52 21" src="https://user-images.githubusercontent.com/55875685/126030280-1cf351a3-5fde-418f-af04-5f0dcdcafb03.png">
期限を設定したTodoをカレンダー上で確認することができます。期限が過ぎているTodoは赤色で表示されます。Todoが1日に3件以上登録されている場合やTodoの文字数が多い場合はカーソルを載せることでポップオーバーが表示され全てのTodoを確認することができます。

### グラフ画面
<img width="1280" alt="スクリーンショット 2021-07-18 14 11 11" src="https://user-images.githubusercontent.com/55875685/126056578-5955227c-4214-4490-8e40-a77cb51aebd3.png">

![Animated GIF-downsized (2)](https://user-images.githubusercontent.com/55875685/126056609-f634a801-e58b-4272-afae-357d09cac7eb.gif)

完了したTodoに関係する統計情報とTodo完了数の推移グラフが表示されています。グラフは日別・週別・月別で確認できます。また表示期間を変更することで利用開始日から現在までのグラフを全て見ることができます。

### 継続記録画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 42 49" src="https://user-images.githubusercontent.com/55875685/126030021-269355dc-38c2-4497-8346-7a1da6df21b0.png">
一つ以上のTodoを完了した日にちの継続日数を確認することができます。

### 設定画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 35 42" src="https://user-images.githubusercontent.com/55875685/126029875-938f4f65-1cec-49cb-bdc9-aa35c359a845.png">
プロフィール画像・名前・メールアドレスの変更、アカウントの削除をすることができます。

### ユーザーアカウント一覧画面（管理者）
<img width="1280" alt="スクリーンショット 2021-07-18 10 07 51" src="https://user-images.githubusercontent.com/55875685/126052630-d9fa4ba3-2aff-40db-b2c4-9db8bf173552.png">
ユーザーアカウントが一覧で表示されています。クリックすることでそのユーザーの詳細画面に移ります。

### ユーザー詳細画面（管理者）
<img width="1280" alt="スクリーンショット 2021-07-18 10 08 12" src="https://user-images.githubusercontent.com/55875685/126052663-21624734-2de2-4122-8747-6f693f538dae.png">
ユーザーが登録したTodoを確認できます。完了済みになっているTodoはチェックマークのついたアイコンで表示されています。


