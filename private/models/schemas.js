// // var vogels = require('vogels');
// var Joi = require('joi');
// vogels.AWS.config.loadFromPath('./config.json');

// /*
//     TABLES FOR USERS
// */
// var Users = vogels.define('User', {
//     hashKey : 'username',
//     timestamps : true,

//     schema : {
//         username  : Joi.string(),
//         password  : Joi.string(),
//         firstName : Joi.string(),
//         lastName  : Joi.string(),
//         permissions : Joi.number(),
//         email     : Joi.string(),
//     },
// });
// exports.Users = Users;

// /*
//     TABLES FOR NOTES
// */

// // The posts class this is based on didnt use a range key (but the post comments did... why?) // TODO - should make an "entry" db for the content to be tethered. Or just make notes into the "posts" and projects places where you can post
// var Notes = vogels.define('Note', {
//     hashKey :     'nID',
//     rangeKey :    'createdAt', 

//     timestamps :  true,

//     schema : {
//         nID :     vogels.types.uuid(), // How does this work? When is it guaranteed to be unique?
//         content : Joi.string(),
//         updatedAt: Joi.date(),
//         created: Joi.date(),
//         // type : Jois.string(), // How to render on the front end 
//     },
// });
// exports.Notes = Notes;

// var Note2Note = vogels.define('Note2Note', {
//     hashKey: 'nID',
//     rangeKey: 'nID2',

//     schema: {
//         nID: vogels.types.uuid(),
//         nID2: vogels.types.uuid(),
//     },
// });
// exports.Note2Note = Note2Note;

// var NoteComments = vogels.define('NoteComment', {
//     hashKey: 'nID',
//     rangeKey: 'createdAt',

//     timestamps: true,
//     schema: {
//         nID: vogels.types.uuid(),
//         content: Joi.string(),
//         updatedAt: Joi.date(),
//         created: Joi.date(),
//     },
// });
// exports.NoteComments = NoteComments;

// /*
//  TABLES FOR PROJECTS
// */
// var Projects = vogels.define('Project', {
//     hashKey : 'pID',
    
//     timestamps : true,

//     schema : {
//         pID : vogels.types.uuid(),
//         author : Joi.string(),
//         imgPath : Joi.string(), // Don't try to be atlas and do everything. Do the things that are most crucial at start and as get more resources expand what you do
//         title : Joi.string(),
//         subtitle : Joi.string(),
//         description: Joi.string(),
//         updatedAt: Joi.date(),
//         created: Joi.date(),
//     }
// });
// exports.Projects = Projects;

// var Project2Notes = vogels.define('Project2Notes', {
//     hashKey : 'pID',

//     schema : {
//         pID : vogels.types.uuid(),
//         nID : vogels.types.uuid(),
//     }
// });
// exports.Project2Notes = Project2Notes;

// /*
//     TABLE FOR TABS
// */
// var Tab2Projects = vogels.define('Tab2Projects', {
//     hashKey : 'tID',

//     schema : {
//         tID : vogels.types.uuid(),
//         pID : vogels.types.uuid(),
//     }
// });
// exports.Tab2Projects = Tab2Projects;

// // var Note2Project = vogels.define('Note2Project', {
// //     hashKey : 'nID',

// //     schema : {
// //         pID : vogels.types.uuid(),
// //         nID : vogels.types.uuid(),
// //     }
// // });
// // exports.Note2Project = Note2Project;

// /*
//     TABLES FOR NEWSFEED/EVENTS (Not sure how redundant this is...)
// */
// var News = vogels.define('News', {
//     hashKey : 'eID',

//     schema : {
//         eID : vogels.types.uuid(),
//         title : Joi.string(),
//         date : Joi.date(),
//     }
// });
// exports.News = News;

// // Things to expand to
// // var RecommendedProjects = vogels.define('RecommendedProject', {
// //     hashKey : 'user1',
// //     rangeKey: 'user2',
// //     // add the timestamp attributes (updatedAt, createdAt)
// //     timestamps : true,
    
// //     schema : {
// //       user1   : Joi.string(), // hash key
// //       user2   : Joi.string(), // Need to make sort keu
// //       strength  : Joi.number(), // Outgoing, Incoming, Friend
// //     }
// //   });
// //   exports.RecommendedProjects = RecommendedProjects;

// // var Posts = vogels.define('Post', {
// //   hashKey: 'pID',

// //   timestamps : true,

// //   schema : {
// //     pID : vogels.types.uuid(),
// //     content : Joi.string(),
// //     username  : Joi.string(), // Poster
// //     likes : Joi.number(),
// //     type: Joi.string(), // Encodes Status or Update for rendering
// //   },
// // });
// // exports.Posts = Posts;


// // var Wall = vogels.define('Wall', {
// //     hashKey : 'username',
// //     rangeKey: 'pID',

// //     schema  : {
// //       username  : Joi.string(), // Receiver (who's wall its being posted to)
// //       createdAt : Joi.date(),
// //       pID : vogels.types.uuid(),
// //     },
// //     indexes : [{
// //       hashKey : 'username', rangeKey : 'createdAt', type : 'local', name : 'userIndex'
// //     }]
// //   });
// //   exports.Wall = Wall;

// // var PostLikes = vogels.define('PostLike', {
// //   hashKey: 'pID',
// //   rangeKey: 'username',

// //   timestamps: true,

// //   schema : {
// //     pID: vogels.types.uuid(),
// //     username: Joi.string()
// //   }
// // });
// // exports.PostLikes = PostLikes;