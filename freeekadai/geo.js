var map;
var marker;
var officeLatLng = { lat: 35.6222357, lng: 139.7274658 };

function initMap() {
  // Google Mapsを初期化して地図を表示する関数
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    // ブラウザがGeolocation APIに対応している場合
    navigator.geolocation.getCurrentPosition(function(position) {
      // 現在位置の緯度・経度を取得するコールバック関数
      var userLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };

      // ユーザーの現在位置のマーカーを地図上に表示する
      if (!marker) {
        marker = new google.maps.Marker({
          position: userLatLng,
          map: map,
          title: 'Your Location'
        });
      } else {
        marker.setPosition(userLatLng);
      }

      // 地図の中心をユーザーの現在位置に移動する
      //map.setCenter(userLatLng);

      // ユーザーの現在位置からオフィスまでの距離を計算する
      var R = 6371; // 地球の半径(km)
      var dLat = (officeLatLng.lat - userLatLng.lat) * Math.PI / 180;
      var dLon = (officeLatLng.lng - userLatLng.lng) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLatLng.lat * Math.PI / 180) * Math.cos(officeLatLng.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var distanceInKm = (R * c).toFixed(2);

      // 計算された距離をページに表示する
      if(distanceInKm <= 0.07){
        document.getElementById('distance').innerHTML = 'オフィスまでの距離は ' + distanceInKm + ' kmです。出勤または退勤ボタンを押してください。';
        document.getElementById('syukin').disabled = false;
        document.getElementById('taikin').disabled = false;
      }else{
        alert("少し移動して再度お試しください。");
        document.getElementById('syukin').disabled = true;
        document.getElementById('taikin').disabled = true;
      }
    });
  } else {
    // ブラウザがGeolocation APIに対応していない場合
    alert("ブラウザが対応していません。ほかのブラウザでお試しください。");
  }
}

function getT() {
    if (navigator.geolocation) {
      // ブラウザがGeolocation APIに対応している場合
      navigator.geolocation.getCurrentPosition(function(position) {
        // 現在位置の緯度・経度を取得するコールバック関数
        var userLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
  
  
        // ユーザーの現在位置からオフィスまでの距離を計算する
        var R = 6371; // 地球の半径(km)
        var dLat = (officeLatLng.lat - userLatLng.lat) * Math.PI / 180;
        var dLon = (officeLatLng.lng - userLatLng.lng) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(userLatLng.lat * Math.PI / 180) * Math.cos(officeLatLng.lat * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var distanceInKm = (R * c).toFixed(2);
  
        // 計算された距離をページに表示する
        if(distanceInKm <= 0.01){
            //while文で位置情報が遠くなるまで繰り返す。
            while(distanceInKm <= 0.01){
                var userLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };
                var R = 6371; // 地球の半径(km)
                var dLat = (officeLatLng.lat - userLatLng.lat) * Math.PI / 180;
                var dLon = (officeLatLng.lng - userLatLng.lng) * Math.PI / 180;
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(userLatLng.lat * Math.PI / 180) * Math.cos(officeLatLng.lat * Math.PI / 180) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var distanceInKm = (R * c).toFixed(2);
                alert("オフィスまで"+distanceInKm+"です。退勤してください。");
            }
                  
            //遠くなったら下記の処理を実行
            var now = new Date();
            document.getElementById( "overw" ).value = now
            let taikinButton = document.getElementById("taikinbtn");
            taikinButton.click();
             
        }else{
          alert("お疲れ様でした。気を付けてお帰りください。");
        }
      });
    } else {
      // ブラウザがGeolocation APIに対応していない場合
      alert("ブラウザが対応していません。ほかのブラウザでお試しください。");
    }
  }


function setNotification() {
    alert("リマインダーをセットしました");
    // 通知する日時を取得
    var notificationDate = new Date(document.getElementById('notification-date').value);
    
    // 現在の日時を取得
    var now = new Date();
    
    // 通知するまでの時間を計算
    var timeUntilNotification = notificationDate.getTime() - now.getTime();
    
    if (timeUntilNotification > 0) {
      // 通知するまでの時間が残っている場合は、通知を設定
      setTimeout(function() {
        var notificationMessage = document.getElementById('notification-message');
        notificationMessage.innerHTML = '通知しました。';
        alert('出勤時間になりました');
      }, timeUntilNotification);
      
      // 通知を設定した旨を表示
      var notificationMessage = document.getElementById('notification-message');
      notificationMessage.innerHTML = '通知を設定しました。';
    } else {
      // すでに通知する時間を過ぎている場合は、エラーメッセージを表示
      var notificationMessage = document.getElementById('notification-message');
      notificationMessage.innerHTML = 'エラー：過去の日時は指定できません。';
    }
  }

function startWork() {
    // 現在の日時を取得
    var now = new Date();
  
    // 氏名とシフト開始終了時間を取得
    var name = document.getElementById('name').value;
    var shiftStart = new Date(document.getElementById('shift-start').value);
    var shiftEnd = new Date(document.getElementById('shift-end').value);


  
    // 出勤時間の通知を表示
    alert('出勤しました');

    //データをデータベースに送信
    
    document.getElementById( "namein" ).value = name
    document.getElementById( "shift-startin" ).value = shiftStart
    document.getElementById( "shift-endin" ).value = shiftEnd
    document.getElementById( "startin" ).value = now
    document.getElementById( "endin" ).value = null

    let syukinButton = document.getElementById("syukinbtn");
    syukinButton.click();
}
  

  // 退勤ボタンのクリック時に実行される関数
async function endWork() {
    
    // 現在の日時を取得
    var now = new Date();
    var name = document.getElementById('name').value;
    var shiftStart = new Date(document.getElementById('shift-start').value);
    var shiftEnd = new Date(document.getElementById('shift-end').value);
  
  
    // 退勤時間の通知を表示
    alert('退勤しました');

    

    //phpでデータベースに書き込みをするが、update文を利用しする
    document.getElementById( "nameout" ).value = name
    document.getElementById( "shift-startout" ).value = shiftStart
    document.getElementById( "shift-endout" ).value = shiftEnd
    document.getElementById( "startout" ).value = document.getElementById( "startin" ).value
    document.getElementById( "endout" ).value = now
    //最後に退勤していることが分かったらリロード
    
    await getT();
        
}
