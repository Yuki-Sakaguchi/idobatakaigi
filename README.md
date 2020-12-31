# React Starter Kit in TypeScript

## DEMO

https://idobatakaigi-with-ham-48a4f.web.app

## Node のインストール方法

本アプリケーションは [Node.js](https://nodejs.org/) を前提としています。macOS の場合だと以下の手順で導入できます。Node のバージョンは`.node-version`を参照し、同じものを使用してください。

    $ wget -P /tmp https://nodejs.org/download/release/v12.18.4/node-v12.18.4.pkg
    $ sudo installer -pkg /tmp/node-v12.18.4.pkg -target /
    installer: Package name is Node.js
    installer: Upgrading at base path /
    installer: The upgrade was successful.
    $ node -v
    v12.18.4

## アプリケーションの起動方法(Docker を使用しない場合)

本プロジェクトは、[create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) により作成したアプリケーションから React の学習に最低限必要な機能のみを厳選し、軽量化したものです。
以下の手順でアプリケーションを起動できます。

    $ wget https://github.com/DiveIntoHacking/react-starter-kit-in-javascript-with-node-v12.18.4/archive/v1.1.tar.gz
    $ tar zxvf v1.1.tar.gz
    $ cd react-starter-kit-in-javascript-with-node-v12.18.4-1.1
    $ yarn install
    $ yarn start

## アプリケーションの起動方法(Docker を使用する場合)

    $ wget https://github.com/DiveIntoHacking/react-starter-kit-in-javascript-with-node-v12.18.4/archive/v1.1.tar.gz
    $ tar zxvf v1.1.tar.gz
    $ cd react-starter-kit-in-javascript-with-node-v12.18.4-1.1
    $ touch .bash_history
    $ docker-compose build
    $ docker-compose run --rm app yarn install
    $ docker-compose up

# 勉強したこと

## git コマンド

最後のやつとかはワンライナーでブランチ切り替えてマージして push までやっちゃう

```
git add .
git diff --cached
git push origin HEAD
git push origin HEAD && git checkout main && git merge - && git push origin HEAD
```

## config.json で設定を外に切り出して振る舞いを帰る

テスト用にログインを飛ばしたい時とかに使ってた。  
React とかだと json を取得するのが簡単なので便利！

## Icon とかのアバターをハッシュで取得する Gravatar が便利

https://ja.gravatar.com/

```
import crypto from 'crypto';

/**
 * Gravatarで使うハッシュを作成する
 */
export const gravatarPath = (string) => {
  const lowerCaseString = string.trim().toLowerCase();
  const md5 = crypto.createHash('md5');
  const digest = md5.update(lowerCaseStrin, 'binary').digest('hex');
  return `https://www.gravatar.com/avatar/${digest}/?d=robohash`;
};
```

## create-react-app の環境変数

`.env`ファイルをつくって`process.env.REACT_APP_*`でアクセスできる  
`REACT_APP_`は頭に付けないとダメ

```
REACT_APP_FOO=hello
```

```
process.env.REACT_APP_FOO
```

みたいに使う

## useRef でコンポーネントの要素にアクセスする

他のコンポーネントで他コンポーネントに直接アクセスしたい時とかにつかう  
他のボタンが押された時に他の要素にフォーカスが向くようにする時など

## scrollIntoView()

要素がユーザーに見えるところまでスクロールさせる API  
https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView  
IE じゃうごかないけど behavior に smooth を渡すとスムーズなアニメーションもできる

```
ref.current.scrollIntoView({ behavior: 'smooth' });
```

## Firebase Hosting すると余計なファイルができるので.gitignore に追加

それぞれ設定やキャッシュの内容なので git には不要

```
/.firebase
/.firebaserc
/firebase.json
```

## Firebase はグローバルじゃなくてプロジェクトに追加で良い

なるべくグローバルは汚したくないので firebase-tools もプロジェクトで良い  
その方が全く触ったことない人がこのプロジェクトをクローンした時にも動かしやすい  
その代わりに実行時には npx をつける

```
yarn add --dev firebase-tools
npx firebase login
npx firebase init
npx firebase deploy
```

## ビルドしたやつを確かめる簡単な方法

これで build 内を 8080 で確認できる

```
cd build
npx http-server
```

## diff コマンド

```
diff -w [比較ファイル1] [比較ファイル2]
```

-w で空白行を無視して比較する。  
差分がなければ何も出ない

## firebase のキーを元に環境変数ファイルを生成するスクリプト

bin でファイルを作り`#!/usr/bin/env node`で node のスクリプトを作って実行するようにした。  
環境変数は git に上げないので、それを持ってきた人が環境変数の設定を間違わないようにするためにも結構大事っぽい

ちなみに頭に書く宣言はそもそも実行する時の実行方法を明示する役目がある。  
よく見る`!#/bin/sh`などは sh で動くことを明示しており、その sh へのフルパスを書いている  
つまり実行するインタープリターの位置を示している

本当なら`!#/usr/bin/node`でも動くがそこに node がない場合もあるので、`which node`で取得したパスを動的に示したい。  
そこで`/usr/bin/env`に使いたいコマンドを渡すことでパスを明示しなくてもそのコマンドを実行することができるのを使っている。  
なので、コマンドから直接`/usr/bin/env node`とやると node の REPL が実行できるし、node 以外の python, ruby とかも実行できるすごいやつ。

この場合`node`はもちろんなきゃ動かない  
`sh`とかは OS にデフォルトで入っているので誰でも動く

実行権限を付与しておく必要があるので`chmod +x [ファイル名]`をやっておく
