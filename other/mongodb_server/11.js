use admin
db.createUser(
  {
    user: "root",
    pwd: "1111",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)


use dbtodo
db.createUser(
    {
      user: "user1",
      pwd: "password1",
      roles: [
         { role: "readWrite", db: "dbtodo" },
      ]
    }
)
