<?php
// MySQLに接続するための情報を設定する
$servername = "mysql17.onamae.ne.jp";
$username = "m0i1t_kosuke124";
$password = "analonany2020!";
$dbname = "m0i1t_kintaikanri_db";


// MySQLに接続する
$conn = new mysqli($servername, $username, $password, $dbname);

// 接続エラーがあるかどうかを確認する
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// POSTリクエストからHTMLのidに関係する要素を取得する


$namein = $_POST['namein'];
$shift_startin = $_POST['shift-startin'];
$shift_endin = $_POST['shift-endin'];
$startin = $_POST['startin'];
$endin = $_POST['endin'];

// SQLクエリを構築する
$sql = "INSERT INTO work (nname, shift_start, shift_end, sstart,eend,overw) VALUES ('$namein', '$shift_startin', '$shift_endin', '$startin','$endin',null)";

// SQLクエリを実行する
if ($conn->query($sql) === TRUE) {
    echo "新しい勤務記録が追加されました";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// MySQL接続を閉じる
$conn->close();
?>

<a href="t.php">トップに戻る</a>
