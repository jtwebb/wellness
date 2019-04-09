import { getData, saveData, saveItem, deleteData } from './localStorage';

const originalConsole = console;

beforeEach(() => {
    localStorage.setItem('_jtwebb_wellness', '{"item1": "A Value", "item2": 1234}');
});

afterEach(() => {
    // eslint-disable-next-line
    console = originalConsole;
});

describe('Local Storage', () => {
    it('should get data as an object', () => {
        expect(getData()).toEqual({
            item1: 'A Value',
            item2: 1234
        });
    });

    it('should log an error and return empty object if the json is not properly formatted', () => {
        localStorage.setItem('_jtwebb_wellness', '{"item1": "A Value", "item2": Not in quotes}');
        global.console = {error: jest.fn()};
        expect(getData()).toEqual({});
        expect(console.error).toHaveBeenCalled();
    });

    it('should set data as a string', () => {
        expect(getData()).toEqual({item1: 'A Value', item2: 1234});

        const newValue = {
            item1: 'Another Value',
            item2: 54321
        };

        const spy = jest.spyOn(Storage.prototype, 'setItem');

        saveData(newValue);
        expect(spy).toHaveBeenCalledWith('_jtwebb_wellness', '{"item1":"Another Value","item2":54321}');
        expect(getData()).toEqual(newValue);
    });

    it('should set a subset of the data in local storage', () => {
        expect(getData()).toEqual({item1: 'A Value', item2: 1234});

        saveItem({key: 'item1', value: 'Another value'});
        expect(getData()).toEqual({item1: 'Another value', item2: 1234});
    });

    it('should log an error when the json is not properly formatted', () => {
        localStorage.setItem('_jtwebb_wellness', '{"item1": "A Value", "item2": Not in quotes}');
        global.console = {error: jest.fn()};
        saveItem({key: 'item1', value: 'Another value'});
        expect(console.error).toHaveBeenCalled();
    });

    it('should delete data', () => {
        expect(getData()).toEqual({item1: 'A Value', item2: 1234});
        deleteData();
        expect(getData()).toEqual(null);
    });
});
