console.log(
  db.universities.aggregate([
    { $match : { name : 'USAL' } },
    { $lookup : {
        from : 'courses',
        localField : 'name',
        foreignField : 'university',
        as : 'courses'
    } },
    { $facet : {
        'countingLevels' :
        [
           { $unwind : '$courses' },
           { $sortByCount : '$courses.level' }
        ],
        'yearWithLessStudents' :
        [
           { $unwind : '$students' },
           { $project : { _id : 0, students : 1 } },
           { $sort : { 'students.number' : 1 } },
           { $limit : 1 }
        ]
    } }
  ])
)