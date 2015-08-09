## PROFILE

Get user informations.  
you can use these API to find a users' info and its follower/following list.



#### API routes
| Method |Request URL         | Params          | Descriptions   | Return|
|--------|:----------------|:----------------|:---------------|-------|
| `GET`  |`/api/profile?{fb_id}`| a user fb_id  | get specify users' info | [example](./returns_example#apiprofilefb_id)|
| `GET` |`/api/profile/follower?{fb_id}` |   a user fb_id| get users' follower list| [example](./returns_example.md#apiprofilefollowerfb_id) |
| `GET` |`/api/profile/following?{fb_id}` |   a user fb_id| get users' following list| [example](./returns_example.md#apiprofilefollowingfb_id)|
