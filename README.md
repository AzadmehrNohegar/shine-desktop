
# Shine Desktop App

A brief description of what this project does and who it's for


## Deployment

Prerequisites:

SQLite3

&nbsp;

To deploy this project run

```bash
    npx prisma migrate dev
    npx prisma generate
```

then run the following commands

```bash
    yarn dev
```

or 

```bash
    npm run dev
```


## Database variables

To run this project, you will need to change the following variables in the ` prisma.schema` file based on your operating system.

For Linux and Mac:
```bash 
datasource db {
  provider     = "sqlite"
  url          = "file:/Users/Shared/db/shine-desktop.db"
  relationMode = "foreignKeys"
}
```

For Windows:
```bash 
datasource db {
  provider     = "sqlite"
  url          = "file:\\db\\shine-desktop.db"
  relationMode = "foreignKeys"
}
```
