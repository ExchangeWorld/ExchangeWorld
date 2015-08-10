## EXCHANGE

Used to **create**, **set status** or **delete** a exchange.

| parameters     | type  | descriptions                                 |
|:---------------|-------|:---------------------------------------------|
| `gid1`        | unsigned integer| the gid that is a **smaller** integer
| `gid2`        | unsigned integer| the gid that is a **bigger** integer

	Any gid1 and gid2 will be modified to fit **_gid1 <= gid2_**

#### API routes
| Method |Request URL         | Params          | Descriptions   | Return|
|--------|:-------------------|:----------------|:---------------|-------|
| `GET` | `/api/exchange/create?{Params}` | as table above | create a **exchange by given two gids** | [example](./returns_example#apiexchangecreate)
| `GET` | `/api/exchange/status?{Params}` | as table above | set the status of **a exchange by given two gids** to completed (exchanged)| [example](./returns_example#apiexchangestatus)
| `GET` | `/api/exchange/delete?{Params}` | as table above | delete a **exchange by given two gids** | [example](./returns_example#apiexchangedelete)
