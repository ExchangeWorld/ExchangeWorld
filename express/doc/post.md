## POST

Use to **create** new post of goods.  
A post of goods must including following informations:

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
| Method |Request URL         | Params          | Descriptions   |Returns|
|--------|:-------------------|:----------------|:---------------|-------|
| `GET`  |`/api/post?{Params}` | as above table, ~~the info of `photoPath` will auto-gen when upload the photo(s).~~  | create new post|   |
| `POST` |`/api/upload/image` | an object have following attribute:<br/>`filename`, `filetype`, `filesize`, `base64`  | upload image(s)|  |
