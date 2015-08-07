## POST

Use to **create** new post of goods.   
A post of goods including following infomations:

| parameters     | type  | descriptions                                 |
|:---------------|-------|:---------------------------------------------|
| `gname`        | string| Name of goods                                |
| `categories`   | string| The category of goods.                       |
| `descriptions` | text  | The detail of goods.                         |
| `photoPath`    | string| Goods photo(s) url                           |
| `ownerID`      |string | Owner of the post.                           |
| `posX`         | float | Latitude of goods                            |
| `posY`         | float | Longitude of goods                           |

#### API routes
| method |Request URL         | Params          | descriptions   |
|--------|:-------------------|:----------------|:---------------|
| `GET`  |`/api/post`         | as above table  | create new post|
| `POST` |`/api/upload/image` | an object have following attribute:<br/>`filename`, `filetype`, `filesize`, `base64`  | create new post|

