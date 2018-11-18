import Amplify from 'aws-amplify';
Amplify.configure({
    Auth: {
    // フェデレーションアイデンティティのID
        identityPoolId: 'ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx',
    // リージョン
        region: 'ap-northeast-1',
    // ユーザープールのID
        userPoolId: 'ap-northeast-1_XXXXXXXX',
    // ユーザープールのウェブクライアントID
        userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxxxxxx',
        mandatorySignIn: true,
    },
    Storage: {
        bucket: '[BUCKET_NAME]', //使用するS3バケット名
        region: 'ap-northeast-1', //リージョン
    },
});