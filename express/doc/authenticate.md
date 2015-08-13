## Authenticate

Used to **validate** or **get a token for a user**.

#### Parameter for `validate`
| parameters     | type  | descriptions                                 |
|:---------------|-------|:---------------------------------------------|
| `token` | string | the token |

#### Parameter for `getToken`
| parameters     | type  | descriptions                                 |
|:---------------|-------|:---------------------------------------------|
| `uid` | unsigned integer | the user who owns the token

#### API routes
| Method |Request URL         | Params          | Descriptions   | Returns |
|--------|--------------------|-----------------|----------------|:--------|
| `GET`  |`/api/authenticate/validate?`         | `token`       | send the token to back-end to make sure this session is okay to go | the result of authentication and including its json (if fail, including **empty token instance**) |
| `GET`  |`/api/authenticate/getToken?`         | `uid` | If uid is already in the table then update its token, otherwise create a token instance in the table for further use | the token json (if there is not that user (unavailable uid), returning **empty json**) |
