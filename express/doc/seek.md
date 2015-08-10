## SEEK

Used to **find** goods.
you can use this API to find goods in some constraints.


| parameters     | type  | descriptions                                 |
|:---------------|-------|:---------------------------------------------|
| `title`        | string| Name of goods                                |
| ~~`category`~~     | string| Category of goods.                       |
| ~~`ownerID`~~      |string | Owner of goods.                              |
| ~~`posX`~~         | float | Latitude of goods                            |
| ~~`posY`~~         | float | Longitude of goods                           |

#### API routes
| Method |Request URL         | Params          | Descriptions   | Return|
|--------|:-------------------|:----------------|:---------------|-------|
| `GET`  |`/api/seek?{Params}`| as table above, if no params, find all.  | search goods in some constrains.| [example](./returns_example#apiseekparams)|
