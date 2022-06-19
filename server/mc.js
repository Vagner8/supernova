console.log(

  db.users.updateOne(
    { "configs.login": 'Dima' },
    {
      $set: {
        contacts: {
          address: 'KV'
        }
      },
    }

  )
)