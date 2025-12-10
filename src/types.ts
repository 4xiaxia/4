// src/types.ts

/**
 * 景点的数据结构
 */
export interface Spot {
  id: string;
  name: string;
  desc: string;
  image: string;
  coord?: string; // "lng,lat"
  location?: string;
  createdAt?: string;
}

/**
 * 历史人物的数据结构
 */
export interface Figure {
  id: string;
  name: string;
  story: string;
  // ... 其他属性
}
