// console.log(
//   db.users.aggregate([
//     {
//       $match: { itemId: 'a2d20632-8d4f-405a-9ba1-f494e169c43d' }
//     },
//     {
//       $project: {
//         personal: '$personal',
//         contacts: '$contacts',
//         address: '$address',
//         imgs: {
//           avatar: '$imgs.avatar'
//         },
//         credentials: {
//           login: '$credentials.login',
//           rule: '$credentials.rule',
//         },
//       }
//     }
//   ])
// )

// console.log(
//   db.users.find({},
//     {
//       _id: "$itemId",
//       name: "$personal.name",
//       surname: "$personal.surname",
//       email: "$contacts.email",
//       phone: "$contacts.phone",
//       rule: "$configs.rule"
//     })
// )


// console.log(
//   db.users.findOne({ itemId: 'a2d20632-8d4f-405a-9ba1-f494e169c43d' },
//     { personal: 1,  } )
// )

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  createNode(value) {
    return {
      value,
      next: null,
    };
  }

  insert(value) {
    this.length++;
    let newNode = this.createNode(value);
  
    if (this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
      return newNode;
    }
  
    this.head = this.tail = newNode;
    return newNode;
  }

  print() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

const list = new LinkedList()
list.insert('dima')
list.insert('alena')
list.print()

let cursor = 0

console.log(
  cursor > 1 && "s"
)