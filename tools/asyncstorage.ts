import AsyncStorage from '@react-native-community/async-storage';

export default {
    getItem: async (key: string) => {
        let data = null;
        try {
            data = await AsyncStorage.getItem(key);
        } catch (error) {
            console.error(`An Error In AsyncStorage Get ${key}: `, error);
        }
        return data;
    },
    setItem: async (key: string, value: any) => {
        let data = null;
        try {
            data = await AsyncStorage.setItem(key, JSON.stringify(value));
            data = true;
        } catch (error) {
            console.error(`An Error In AsyncStorage Set ${key}: `, error);
        }
        return data;
    },
    removeItem: async (key: string) => {
        let data = null;
        try {
            data = await AsyncStorage.removeItem(key);
            data = true;
        } catch (error) {
            console.error(`An Error In AsyncStorage Remove ${key}: `, error);
        }
        return data;
    }
}