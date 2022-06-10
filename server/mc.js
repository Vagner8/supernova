// console.log(
//   db.universities.aggregate([
//     { $match : { name : '' } },
//     { $lookup : {
//         from : 'courses',
//         localField : 'name',
//         foreignField : 'university',
//         as : 'courses'
//     } },
//     { $facet : {
//         'countingLevels' :
//         [
//            { $unwind : '$courses' },
//            { $sortByCount : '$courses.level' }
//         ],
//         'yearWithLessStudents' :
//         [
//            { $unwind : '$students' },
//            { $project : { _id : 0, students : 1 } },
//            { $sort : { 'students.number' : 1 } },
//            { $limit : 1 }
//         ]
//     } }
//   ])
// )

const arr = [1, 5]

console.log(arr[6])