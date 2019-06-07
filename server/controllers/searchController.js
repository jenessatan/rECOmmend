const Search = require('../models/search');

const searchController = {};

// TODO: Might want to find a better way to handle account not found

searchController.findBusiness = (req, res) => {
//	const payload = {
//		description: req.body.description,
//		name: req.body.name,
//		maxPrice: req.body.maxPrice,
//		minPrice: req.body.minPrice,
//		resultColumns: req.body.resultColumns
//		};
//	if (req.params.searchType==='and') {
 // 		Search.findProductAnd(payload)
//  		.then(response => {
 // 			if (response) {
  //		res.json({
    //  		message: "Success",
     // 		data: response
    //	});
    //} else {
	//	throw new Error(`Account ${req.params.accountid} not found`);
   //}
//  })
//  .catch(err => {
 // 	console.log("error message");
 //   console.log(err);
 //   res.status(500).json({error: `${err}`});
 // });
};

searchController.findAllProducts = (req, res) => {
    Search.findAllProducts()
        .then((response) => {
            if (response){
                res.json({
                    message: 'Success',
                    data: response.rows
                });
            } else {
                throw new Error (``);
            }
        })
        .catch((err) => {
            res.status(500).json({ error: `${err}`});
        });
};


searchController.findProduct = (req, res) => {
//	console.log('***payload***');
//	console.log(req.body);
//	const payload = {
//		name: req.body.name,
//		email: req.body.email
//	 };
//	Consumer.editById(req.params.accountid, payload)
//	.then(response => {
//		if (response.rowCount === 1) {
//			res.send({
//				message: 'Success'
//			});
//		} else {
//			throw new Error(`Unable to update account ${req.params.accountid}`);
//		}
//	})
//	.catch(error => {
//		res.status(500).json({error: `${error}`});
//	});
};

module.exports = searchController;

