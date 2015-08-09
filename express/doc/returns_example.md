## API returns example

#### `/api/seek?{Params}`

- Request:  
`/api/seek?title=紅`  
- Returns:  
*Array of **goods** object*

```
[
    {
        "gid": 35,
        "gname": "紅色迴紋針",
        "photoPath": "./images/database/0.jpg",
        "categories": "Others",
        "description": "",
        "want": "房子",
        "posX": 121.567,
        "posY": 24.9874,
        "ownerID": "1006851545998566",
        "status": 0,
        "user": {
          "fb_id": "1006851545998566",
          "uid": 5,
          "username": "陳品嘉",
          "email": "test@gmail.com",
          "nickname": "thisisnickname",
          "photoPath": "https://scontent-tpe.xx.fbcdn.net/hprofile-xfp1/v/l/t1.0-1/s320x320/1920071_855872071096515_406318999718397443_n.jpg?oh=b821b3bd1a30069319d615d075952f03&oe=557A7811",
          "exchangeTable": 5,
          "followerTable": 5,
          "seekerTable": 5
        }
    },
    {
        "gid": 34,
        "gname": "紅米3",
        "photoPath": "./images/database/1378039687_509.jpg",
        "categories": "Smart Phone",
        "description": "保固期限：2015/3\\\n交換原因：需要雙卡雙待功能",
        "want": "紅米note增強版",
        "posX": 121.563,
        "posY": 24.9829,
        "ownerID": "1006851545998566",
        "status": 0,
        "user": {
          "fb_id": "1006851545998566",
          "uid": 5,
          "username": "陳品嘉",
          "email": "test@gmail.com",
          "nickname": "thisisnickname",
          "photoPath": "https://scontent-tpe.xx.fbcdn.net/hprofile-xfp1/v/l/t1.0-1/s320x320/1920071_855872071096515_406318999718397443_n.jpg?oh=b821b3bd1a30069319d615d075952f03&oe=557A7811",
          "exchangeTable": 5,
          "followerTable": 5,
          "seekerTable": 5
        }
    }
]
```

#### `/api/goods?{gid}`

- Request:  
`api/goods?gid=34`
- Returns:  
*Array that contains only one **goods** object and its **comments** *

```
[
  {
    "gid": 36,
    "gname": "壓力鍋",
    "photoPath": "./images/database/iiii.jpg",
    "categories": "Others",
    "description": "幾乎沒有用過的壓力鍋>w<，很適合煮飯或燉肉唷!",
    "want": "有顏色的迴紋針",
    "posX": 121.531,
    "posY": 24.9957,
    "ownerID": "866554610033093",
    "status": 0,
    "user": {
      "fb_id": "866554610033093",
      "uid": 6,
      "username": "鮑聖文",
      "email": "test@gmail.com",
      "nickname": "thisisnickname",
      "photoPath": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p320x320/10923211_874296462592241_6193637254858181483_n.jpg?oh=6423f873b0adf00c58b2cacefa1d3f86&oe=55BC6F8F&__gda__=1435139689_3d59bf933c1db679ac3255dd642d6104",
      "exchangeTable": 6,
      "followerTable": 6,
      "seekerTable": 6
    },
    "comments": [
      {
        "cid": 37,
        "goods_id": 36,
        "commenter": "611870928958311",
        "comment": "我感到好有壓力"
      },
      {
        "cid": 42,
        "goods_id": 36,
        "commenter": "866554610033093",
        "comment": "XDDDDDD  什麼啦"
      }
    ]
  }
]
```
