const router = require('express').Router();
const {  } = require('../../controllers/user-controller'); // add schemas/resolvers/*mutations* to the { }

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware,  ); // mising the second argument in the put method. Was the saveBook mutation originally. 

router.route('/login').post(login);

router.route('/me').get(authMiddleware, ); // missing the second argument in the get method. Was the getSingleUser query originally, but will likely need to be changed, if used at all.

router.route('___/:___id').delete(authMiddleware, ); // needs route to delete a post by id, missing the second argument. Was the deleteBook mutation originally.

module.exports = router;