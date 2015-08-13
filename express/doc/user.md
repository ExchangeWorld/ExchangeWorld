## User

Get user informations.  
you can use these API to :
- register new user
- find/edit a users' info
- get a users' follower/following list.



#### API routes
| Method |Request URL         | Params          | Descriptions   | Return|
|--------|:----------------|:----------------|:---------------|-------|
| `GET`  |`/api/user?{uid}`| `uid`  | get specify user | [example]()|
| `POST` |`/api/user/register?{Params}` |  as [table2]()| create new user | [example]()|
| `GET`  |`/api/user/profile?{uid}`| `uid`  | get specify users' info | [example]()|
| `PUT` |`/api/user/profile/edit?{Params}` |   as [table1]()| edit a users' data.| pending|
| `GET` |`/api/user/follower?{uid}` |   `uid`| get users' follower list| [example]() |
| `GET` |`/api/user/following?{uid}` |   `uid`| get users' following list| [example]()|
