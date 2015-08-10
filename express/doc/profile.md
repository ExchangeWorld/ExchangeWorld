## PROFILE

Get user informations.  
you can use these API to :
- find/edit a users' info
- get a users' follower/following list.



#### API routes
| Method |Request URL         | Params          | Descriptions   | Return|
|--------|:----------------|:----------------|:---------------|-------|
| `GET`  |`/api/profile?{fb_id}`| a user fb_id  | get specify users' info | [example](./returns_example.md#apiprofilefb_id)|
| Not implemented yet |`/api/profile/edit?{fb_id}` |   a user fb_id| edit a users' data.| pending|
| `GET` |`/api/profile/follower?{fb_id}` |   a user fb_id| get users' follower list| [example](./returns_example.md#apiprofilefollowerfb_id) |
| `GET` |`/api/profile/following?{fb_id}` |   a user fb_id| get users' following list| [example](./returns_example.md#apiprofilefollowingfb_id)|
