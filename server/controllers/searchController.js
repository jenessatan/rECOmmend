const Search = require('../models/search');

const searchController = {};

searchController.getNumberOfBusinesses = (req, res) => {
	Search.getNumberOfBusinesses()
		.then((response) => {
			if (response) {
				res.json({
					message: 'Success',
					data: response,
				});
			} else {
				throw new Error('Unable to get business count');
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `${err}` });
		});
};

searchController.findAllBusinesses = (req, res) => {
	Search.findAllBusinesses()
		.then((response) => {
			res.json({
				message: 'Success',
				data: response});
		})
		.catch((error) => {
			console.log('Error getting businesses');
			res.status(500).json({error: error});
		});
};

searchController.findBusinessAllCertifications = (req,res) => {
	Search.findBusinessAllCertifications(req.body)
		.then((response) => {
			if (response && response.rows.length > 0) {
				res.json({
					success: !!response,
					data: response.rows
				});
			} else {
				res.json({
					success: !!response,
					data: 'Data unavailable'
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ err });
		});
};

searchController.findBusinessByNameAndAnyCertification = (req, res) => {
	console.log(req.body);
	Search.findBusinessByNameAndAnyCertification(req.body)
		.then((response) => {
			console.log(response);
			if (response && response.rows.length > 0) {
				res.json({
					success: !!response,
					data: response.rows
				});
			} else {
				res.json({
					success: !!response,
					data: 'Data unavailable'
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ err });
		});
};

searchController.findBusinessByNameAndCertification = (req, res) => {
	// if (req.params.cert==='all') {
	// 	Search.findBusinessAllCertifications()
	// 	.then((response) => {
	// 		res.json({
	// 			message: 'Success',
	// 			data: response});
	// 	})
	// 	.catch((error) => {
	// 		console.log('Error searching businesses by certification');
	// 		res.status(500).json({error: error});
	// 	});
	// }
	// else {
	console.log(req.body);
		Search.findBusinessByNameAndCertification(req.body)
		.then((response) => {
			console.log(response);
			res.json({
				message: 'Success',
				data: response.rows});
			})
			.catch((error) => {
			console.log('Error searching businesses by certification');
			res.status(500).json({error: error});
		});
	//}
};

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

