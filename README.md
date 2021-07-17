# TodoList
Todoリストアプリケーションです。Todo完了数のグラフ表示、継続日数の表示によりTodo管理の継続化を促します。レスポンシブ対応しているためPC・タブレット・スマートフォンにて利用可能です。

このアプリはフロントエンドとバックエンドでリポジトリが分かれています。こちらフロントエンドのリポジトリであり、バックエンドは下記のリポジトリになります。

https://github.com/sky2432/todo-laravel


## アプリケーションURL
https://rese-vue.netlify.app

ログイン画面の「ゲストログイン」ボタンからアプリを体験してみてください。

## 使い方
### ホーム画面
<img width="1280" alt="スクリーンショット 2021-07-17 15 53 43" src="https://user-images.githubusercontent.com/55875685/126029143-d405b746-0bf9-4ed7-8620-6bc4f415030c.png">
<img width="1280" alt="スクリーンショット 2021-07-17 16 14 22" src="https://user-images.githubusercontent.com/55875685/126029299-fe961f20-0c61-4971-8c88-c7bc284fb5e6.png">
Todoの登録と変更ができます。またそれぞれのTodoの横にあるチェックボックスを押すことで完了済みにすることができます。Todoには期限とリマインド日時を設定することも可能です。期限が過ぎているTodoは赤色で表示されます。

### 完了済みTodo一覧画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 16 06" src="https://user-images.githubusercontent.com/55875685/126029371-2b973818-fa11-4b7f-bc3a-234d652f54b5.png">
完了済みにしたTodoが一覧で表示されています。こちらの画面ではTodoの削除・完了済みを取り消すことができます。

### カレンダー画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 18 49" src="https://user-images.githubusercontent.com/55875685/126029483-ea66d55b-9b4a-4d66-9143-3143f9c3cfdb.png">
期限を設定したTodoをカレンダー上で確認することができます。期限が過ぎているTodoは赤色で表示されます。Todoが1日に3件以上登録されている場合やTodoの文字数が多い場合はカーソルを載せることでポップオーバーが表示され全てのTodoを確認することができます。

### グラフ画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 25 26" src="https://user-images.githubusercontent.com/55875685/126029658-982650d2-05df-4d6c-a33a-c70ed4b5e67f.png">
完了したTodoに関係する統計情報とTodo完了数の推移グラフが表示されています。グラフは日別・週別・月別で確認できます。

### 継続記録画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 42 49" src="https://user-images.githubusercontent.com/55875685/126030021-269355dc-38c2-4497-8346-7a1da6df21b0.png">
一つ以上のTodoを完了した日の継続日数を確認することができます。

### 設定画面
<img width="1280" alt="スクリーンショット 2021-07-17 16 35 42" src="https://user-images.githubusercontent.com/55875685/126029875-938f4f65-1cec-49cb-bdc9-aa35c359a845.png">
画像・名前・メールアドレスの変更、アカウントの削除をすることができます。

## 機能一覧
- ログイン・ログアウト
- アカウントの登録・更新・削除
- Todoのの登録・更新・削除
- Todoの期限・リマインド日時の設定
- メール通知（会員登路時・ログイン時・Todoのリマインド時・Todoの期限超過時）
- カレンダー上でのTodoの確認
- Todo完了数の推移グラフ表示（日別・週別・月別）
- カレンダー上でTodoを完了した日を確認
- プロフィール画像の設定・更新
- 管理者画面でのユーザー一覧とTodo一覧の確認

## 使用技術
フロントエンド
- HTML/CSS
- JavaScript
- Vue.js 2.6.11
- bootstrap-vue 2.21.2
- Netlify

バックエンド
- PHP 7.3
- Laravel 8.12
- AWS S3
- Heroku
