let atlas_uri = 'mongodb://larry:larry12345@ac-bevgipt-shard-00-00.kwhxupq.mongodb.net:27017,ac-bevgipt-shard-00-01.kwhxupq.mongodb.net:27017,ac-bevgipt-shard-00-02.kwhxupq.mongodb.net:27017/?ssl=true&replicaSet=atlas-auh18q-shard-0&authSource=admin&retryWrites=true&w=majority'
const cloud_db = 'Hotel_Management_System'
// const local_uri = 'mongodb://localhost:27017'
// const local_db = 'Hotel_Management_System'


let config = {
    atlas_uri,
    cloud_db
}




module.exports = config