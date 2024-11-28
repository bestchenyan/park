import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  /**
   * 存储数据
   * @param key 键
   * @param value 值
   */
  static async set(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Storage 存储失败:', error);
      throw error;
    }
  }

  /**
   * 获取数据
   * @param key 键
   * @returns 解析后的数据
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Storage 读取失败:', error);
      throw error;
    }
  }

  /**
   * 删除数据
   * @param key 键
   */
  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage 删除失败:', error);
      throw error;
    }
  }

  /**
   * 清空所有数据
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage 清空失败:', error);
      throw error;
    }
  }

  /**
   * 获取所有存储的键
   * @returns 键数组
   */
  static async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Storage 获取所有键失败:', error);
      throw error;
    }
  }
}

export default Storage;
