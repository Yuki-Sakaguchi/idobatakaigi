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
