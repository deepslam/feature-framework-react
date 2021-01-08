import LocalStorageDataProvider from "../providers/LocalStorageDataProvider";

describe("Async storage test", () => {
  it("Should load and save data correctly", async () => {
    const provider = new LocalStorageDataProvider();
    const object = {
      test: "test",
    };
    const loadingEmptyResult = await provider.load("test");
    expect(loadingEmptyResult).toBe(null);
    const removeNonExistingKeyResult = await provider.remove("test");
    expect(removeNonExistingKeyResult).toBe(false);

    const savingResult = await provider.save("test", object);
    expect(savingResult).toBe(true);

    const loadingResult = await provider.load("test");
    expect(loadingResult).toBe(JSON.stringify(object));

    const removeExistingKeyResult = await provider.remove("test");
    expect(removeExistingKeyResult).toBe(true);
  });
});
