// console.log(
//   db.owners.findOne({login: "Dima"})
// )

console.log(
  db.owners.updateOne(
    {
      login: "Dima"
    },
    {
      $set: {
        personal: {
          name: '',
          surname: '',
          avatar: '',
        },
        contacts: {
          email: '',
          phone: '',
        },
        address: {
          city: '',
          zip: '',
          street: '',
          number: '',
        }
      }
    }
  )
)

// console.log(
//   db.owners.updateOne(
//     {
//       login: "Dima",
//     },
//     {
//       $set: {
//         "contacts.h": "h"
//       }
//     }
//   )
// )

// console.log(
//   db.owners.aggregate(
//     [
//       {
//         $addFields: {
//           "contacts.h": "h"
//         }
//       }
//     ]
//   )
// )