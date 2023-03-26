<?php
if($error_message) {
	echo $error_message;
}
?>

<form action="login.php" method="POST">
	<p>ログインID：<input type="text" name="user_name"></p>
	<p>パスワード：<input type="password" name="password"></p>
	<input type="submit" name="login" value="ログイン">
</form>
<?php
session_start();

$error_message = "";

if(isset($_POST["login"])) {

	if($_POST["user_name"] == "admin" && $_POST["password"] == "password") {
		$_SESSION["user_name"] = $_POST["user_name"];
		$login_success_url = "index.php";
		header("Location: {$login_success_url}");
		exit;
	}
$error_message = "※ID、もしくはパスワードが間違っています。<br>　もう一度入力して下さい。";
}
?>