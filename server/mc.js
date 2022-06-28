// console.log(
//   db.users.aggregate([
    // {
    //   $project: {
    //     _id: "$personal.name",
    //     table: "$personal.name"
    //   }
    // }
//   ])
// )

// console.log(
//   db.users.find({},
//     {
//       _id: "$userId",
//       name: "$personal.name",
//       surname: "$personal.surname",
//       email: "$contacts.email",
//       phone: "$contacts.phone",
//       rule: "$configs.rule"
//     })
// )


console.log(
  db.users.findOne({ userId: 'a2d20632-8d4f-405a-9ba1-f494e169c43d' },
    { personal: 1,  } )
)