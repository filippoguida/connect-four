const { getAlbumNames } = require("./albums");
const spotify = require("./spotify");

jest.mock("./spotify");

test("album names are in alphabetical order", () => {
    spotify.search.mockResolvedValue({
        albums: {
            items: [
                "anarchy in the BBQ",
                "cow on a stick",
                "eat m eat",
                "hot wings",
                "veggy blood",
                "zebra with fries"
            ]
        }
    });
    return getAlbumNames("meat loaf").then(albumNames => {
        expect(albumNames).toEqual(albumNames.sort());
    });
});
