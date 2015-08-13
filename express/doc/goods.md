## GOODS

Used to **find** specified goods.  
you can use this API to get a goods informations.



#### API routes
| Method |Request URL         | Params          | Descriptions   | Return|
|--------|:-------------------|:----------------|:---------------|-------|
| `GET`  |`/api/goods/search?{Params}`| as [table1](#Table1)</br> if no params, find all.  | search goods in some constrains.| [example](./returns_example#apiseekparams)|
| `GET` |`/api/goods?{gid}` | `gid` or `owner_uid`  | get specify goods info. including **comments**|complete|
| `POST`  |`/api/goods/post?{Params}` | as [table2](#table2) </br>the info of `photo_path` will auto-gen when upload the photo(s). | create new post| [example](./returns_example.md#apigoodsgid) |
|`PUT` |`/api/goods/edit?{Params}` | `gid` and [table2](#table2) | edit an existed goods.| complete |
| `PUT` |`/api/goods/delete?{gid}` | `gid`  | delete an existed goods. </br>Don't really drop data-row, using *delete flags* | complete |

#### table1
| parameters     | type  | descriptions                                 |
|:---------------|-------|:---------------------------------------------|
| `name`        | string| Name of goods                                |
| `category`    | string| Category of goods.                       |
| ~~`owner_uid`~~      |string | Owner of goods.                              |
| ~~`position_x`~~         | float | Latitude of goods                            |
| ~~`position_y`~~         | float | Longitude of goods                           |

#### table2
| parameters     | type  | descriptions                                 |
|:---------------|-------|:---------------------------------------------|
| `name`        | string| Name of goods                                |
| `category`   | string| The category of goods.                       |
| `description` | text  | The detail of goods.                         |
| `photo_path`    | string| Goods photo(s) url                           |
| `owner_uid`      |int | Owner of the post.                           |
| `position_x`         | float | Latitude of goods                            |
| `position_y`         | float | Longitude of goods                           |
