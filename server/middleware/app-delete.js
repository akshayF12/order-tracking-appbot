import chargeData from "../../modules/billing-module.js";
import shopData from "../../modules/session-module.js";
export default async function appDeleteData(shop) {
  console.log(shop);
  chargeData.findOneAndDelete({ age: { $gte: 5 } }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted User : ", docs);
    }
  });

  console.log(result);
}
