console.log(
  db.products.updateOne({ itemId: '417ae3d1-0212-4321-b36c-ea92b4739db5' },
    [
      { $set: { settings: { disabled: true } } }
    ]
  )
)

// console.log(
//   db.products.updateOne({ itemId: '1c316f79-acc5-4f4c-b269-58f549c53592' },
//     {
//       $set: {
//         settings: {
//           "category": "Devices",
//           "currency": "",
//           "disabled": false,
//           "discount": "",
//           "discountStart": "",
//           "discountEnd": ""
//         }
//       }
//     })
// )