const db = require('../db/config');

const Business = {};

Business.deleteById = id => db.result(
  'DELETE FROM business WHERE businessid = $1', [id]
);

// TODO: Change to db.tx
Business.editById = (id, payload) => db.result('UPDATE business SET name = $/name/, email = $/email/, description = $/description/ WHERE businessid = $/id/',
  {
    name: payload.name,
    email: payload.email,
    description: payload.description,
    id
  });

Business.findById = id => db.oneOrNone(
  'SELECT * FROM business WHERE businessid = $1',
  [id]
);

// Return one business from email,password
Business.login = (email, password) => db.oneOrNone(
  'Select * from business where email = $1 and password = $2',
  [email, password]
);

Business.sellsNewProduct = (pid, bid) => db.result(
  'INSERT INTO sells (productid, businessid) values ($1, $2)',
  [pid, bid]
);

Business.getCert = id => db.result(
  'SELECT certname FROM has_cert h, certification c WHERE h.businessid = $1 AND h.certid = c.certid',
  [id]
);

//added, returns the average number of rewards redeemed by each customer given a particular business
Business.avgRewardsRedeemed = id => db.oneOrNone(
  'SELECT AVG(numRedeemed) FROM (SELECT c.ConsumerID as CID, COALESCE(numRedeemed,0) as numRedeemed from consumer c LEFT JOIN (SELECT ConsumerID, COUNT(*) as numRedeemed FROM redeems_reward WHERE BusinessID = $1 GROUP BY ConsumerID) as r ON c.ConsumerID = r.ConsumerID) as joined', 
 [id]
);

Business.getReward = id => db.result(
  'SELECT * FROM offers_reward WHERE businessid = $1',
  [id]
);

Business.sellsNewProduct = (pid, bid) => db.result(
  'INSERT INTO sells (productid, businessid) values ($1, $2)',
  [pid, bid]
);

  Business.getProduct = id => db.result(
  'SELECT * FROM products p, sells s WHERE p.productid = s.productid AND s.businessid = $1',
  [id]
);

Business.redeemedRewards = id => db.result(
  'SELECT rewardname, COUNT(*) FROM redeems_reward WHERE businessid = $1 GROUP BY rewardname',
  [id]
);

Business.deleteReward = (id, name) => db.result(
  'DELETE from offers_reward WHERE businessid= $1 AND rewardname= $2',
  [id, name]
);

Business.deleteProduct = (bid, pid) => db.result(
  'DELETE FROM sells WHERE businessid=$1 AND productid=$2',
  [bid, pid]
)

module.exports = Business;
