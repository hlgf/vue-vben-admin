// 缓存接口
export interface Cache<V = any> {
  // 值
  value?: V;
  // 计时器的ID
  timeoutId?: ReturnType<typeof setTimeout>;
  // 过期时间毫秒值（new Date + alive）
  time?: number;
  // 存活时间
  alive?: number;
}

// 不存活为0
const NOT_ALIVE = 0;

// 内存类
export class Memory<T = any, V = any> {
  // 缓存对象，一个Key一个缓存接口
  private cache: { [key in keyof T]?: Cache<V> } = {};
  // 默认存活时间
  private alive: number;

  constructor(alive = NOT_ALIVE) {
    // Unit second
    this.alive = alive * 1000;
  }

  // 返回这个缓存
  get getCache() {
    return this.cache;
  }

  // 设置缓存
  setCache(cache) {
    this.cache = cache;
  }

  // get<K extends keyof T>(key: K) {
  //   const item = this.getItem(key);
  //   const time = item?.time;
  //   if (!isNullOrUnDef(time) && time < new Date().getTime()) {
  //     this.remove(key);
  //   }
  //   return item?.value ?? undefined;
  // }

  get<K extends keyof T>(key: K) {
    return this.cache[key];
  }

  // key、值、过期时间
  set<K extends keyof T>(key: K, value: V, expires?: number) {
    // 先获取
    let item = this.get(key);

    // 处理非法过期时间
    if (!expires || (expires as number) <= 0) {
      expires = this.alive;
    }
    // 如果原来缓存有值
    if (item) {
      // 如果计时器ID存在
      if (item.timeoutId) {
        // 清除计时器
        clearTimeout(item.timeoutId);
        // 计时器ID置空
        item.timeoutId = undefined;
      }
      // 缓存赋值
      item.value = value;
    } else {
      // 原值不存在，赋值
      item = { value, alive: expires };
      this.cache[key] = item;
    }

    // 如果过期时间不存在
    if (!expires) {
      // 返回值
      return value;
    }
    const now = new Date().getTime();
    /**
     * Prevent overflow of the setTimeout Maximum delay value
     * Maximum delay value 2,147,483,647 ms
     * https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
     */
    item.time = expires > now ? expires : now + expires;
    item.timeoutId = setTimeout(
      () => {
        this.remove(key);
      },
      expires > now ? expires - now : expires,
    );

    return value;
  }

  remove<K extends keyof T>(key: K) {
    const item = this.get(key);
    // 缓存对象上删除这个Key
    Reflect.deleteProperty(this.cache, key);
    // 如果缓存的Key对应的值存在
    if (item) {
      // 清除定时器
      clearTimeout(item.timeoutId!);
      return item.value;
    }
  }

  // 将传入的缓存对象设置到缓存中
  resetCache(cache: { [K in keyof T]: Cache }) {
    Object.keys(cache).forEach((key) => {
      const k = key as any as keyof T;
      const item = cache[k];
      if (item && item.time) {
        const now = new Date().getTime();
        const expire = item.time;
        if (expire > now) {
          this.set(k, item.value, expire);
        }
      }
    });
  }

  // 清除内存
  clear() {
    // 先将所有计时器去除
    Object.keys(this.cache).forEach((key) => {
      const item = this.cache[key];
      item.timeoutId && clearTimeout(item.timeoutId);
    });
    // 将缓存清空
    this.cache = {};
  }
}
