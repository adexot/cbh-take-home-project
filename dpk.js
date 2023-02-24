const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = event.partitionKey ?? generateHash(JSON.stringify(event));
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateHash(candidate);
  }

  return candidate;
};

/**
 * This generates the hash string for the data supplied
 * @param {*} data 
 * @returns string
 */
function generateHash(data) {
  const HASH_ALGO = 'sha3-512';
  const ENCODING = 'hex';

  return crypto.createHash(HASH_ALGO).update(data).digest(ENCODING);
}
