<?php
// MySQLに接続するための情報を設定する
$servername = "host";
$username = "user";
$password = "password";
$dbname = "dbname";

// MySQLに接続する
$conn = new mysqli($servername, $username, $password, $dbname);

// 接続エラーがあるかどうかを確認する
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// POSTリクエストからHTMLのidに関係する要素を取得する
$nameout = $_POST['nameout'];
$shift_startout = $_POST['shift-startout'];
$shift_endout = $_POST['shift-endout'];
$startout = $_POST['startout'];
$endout = $_POST['endout'];
$overw = $_POST['overw'];

// SQLクエリを構築する
$sql = "UPDATE work SET eend='$endout',overw='$overw' WHERE shift_start='$shift_startout' and nname='$nameout'";

// SQLクエリを実行する
if ($conn->query($sql) === TRUE) {
    echo "勤務記録が更新されました";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// MySQL接続を閉じる
$conn->close();
?>
<a href="t.php">トップに戻る</a>
