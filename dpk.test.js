const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("Returns the stringified partitionKey if event is supplied with partitionKey", () => {
    const event = { partitionKey: 100 }

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe("100");
  });

  it("Returns hash string if event with partitionKey is not defined", () => {
    const event = {}
    const result = 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862';

    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey).toBe(result);
  });
});
