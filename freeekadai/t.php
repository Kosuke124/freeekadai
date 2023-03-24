<!DOCTYPE html>
<html>
  <head>
    <title>勤怠管理</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      #map {
        height: 500px;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <h1>勤怠管理</h1>
    <form>
      <label for="notification-date">通知する日時：</label>
      <input type="datetime-local" id="notification-date" name="notification-date"><br>
      <button onclick="setNotification()" type="button" id="set-notification">通知を設定する</button>
    </form>
    <div id="notification-message"></div>
    <p>出勤、退勤ボタンを押す際には確認のため氏名、シフトの開始終了予定時刻を入力してください。</p>
    <form>
      <label for="name">氏名：</label>
      <input type="text" id="name" name="name"><br>
      <label for="shift-start">シフト開始時間：</label>
      <input type="datetime-local" id="shift-start" name="shift-start"><br>
      <label for="shift-start">シフト終了時間：</label>
      <input type="datetime-local" id="shift-end" name="shift-end"><br>
    </form>

    <form action="write.php" method="POST" hidden>
      <input type="text" id="namein" name="namein"><br>
      <input id="shift-startin" name="shift-startin"><br>
      <input id="shift-endin" name="shift-endin"><br>
      <input id="startin" name="startin" ><br>
      <input id="endin" name="endin"><br>
      <button id="syukinbtn" type="submit" >データ送信</button>
    </form>

    <form action="update.php" method="POST" hidden>
      <input type="text" id="nameout" name="nameout"><br>
      <input id="shift-startout" name="shift-startout"><br>
      <input id="shift-endout" name="shift-endout"><br>
      <input id="startout" name="startout" ><br>
      <input id="endout" name="endout"><br>
      <input id="overw" name="overw"><br>
      <button id="taikinbtn" type="submit" >データ送信</button>
    </form>


    <br>
    <h2>勤務記録</h2>
    <table hidden>
      <thead>
        <tr>
          <th>氏名</th>
          <th>出勤時間</th>
          <th>退勤時間</th>
          <th>勤務時間</th>
        </tr>
      </thead>
      <tbody id="record">
      </tbody>
    </table>
    <?php

    // MySQLデータベースに接続する
    $host = "mysql17.onamae.ne.jp";
    $username = "m0i1t_kosuke124";
    $password = "analonany2020!";
    $dbname = "m0i1t_kintaikanri_db";
    
    $conn = mysqli_connect($host, $username, $password, $dbname);
    
    // 接続エラーが発生した場合、エラーメッセージを表示する
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }
    
    // データベースからデータを取得する
    $sql = "SELECT * FROM work";
    $result = mysqli_query($conn, $sql);
    
    // 取得したデータをテーブルとしてHTMLに表示する
    if (mysqli_num_rows($result) > 0) {
      echo "<table>";
      echo "<tr><th>氏名</th><th>勤務開始予定時間</th><th>勤務終了予定時間</th><th>勤務開始時間</th><th>勤務終了時間</th><th>終了後滞在時間</th></tr>";
      while($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td>" . $row["nname"]. "</td><td>" . $row["shift_start"]. "</td><td>" . $row["shift_end"]. "</td><td>" . $row["sstart"]. "</td><td>" . $row["eend"]. "</td><td>" . $row["overw"]. "</td></tr>";
      }
      echo "</table>";
    } else {
      echo "0 results";
    }
    
    // MySQLデータベースから切断する
    mysqli_close($conn);
    
    ?>
    <div id="map" hidden></div>
    <button onclick="getCurrentLocation()">位置情報を取得</button>
    <p id="distance"></p>
    <button onclick="startWork()" id="syukin" type="submit" disabled=true>出勤</button>
    <button onclick="endWork()" id="taikin" type="submit" disabled=true>退勤</button>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcNuTH8Of78SO2HxSpYyQAyPTBX9f-d6U&callback=initMap"
    async defer></script>
    <script src="new.js"></script>
  </body>
</html>
