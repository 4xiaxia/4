import { createClient } from '@supabase/supabase-js';

// 从环境变量中获取Supabase的URL和Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// 校验环境变量是否存在
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be defined in the environment variables.");
}

// 创建并导出Supabase客户端实例
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * 从指定的表中获取所有记录
 * @param tableName - 表名
 * @returns 表中所有记录的数据
 */
export const getAll = async (tableName: string) => {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) throw error;
  return data;
};

/**
 * 根据ID从指定的表中获取单条记录
 * @param tableName - 表名
 * @param id - 记录的ID
 * @returns 单条记录的数据
 */
export const getById = async (tableName: string, id: string | number) => {
  const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

/**
 *向指定的表中插入一条新记录
 * @param tableName - 表名
 * @param record - 要插入的记录对象
 * @returns 插入成功后的记录数据
 */
export const create = async <T extends Record<string, any>>(tableName: string, record: T) => {
  const { data, error } = await supabase.from(tableName).insert([record]).select().single();
  if (error) throw error;
  return data;
};

/**
 * 根据ID更新指定表中的一条记录
 * @param tableName - 表名
 * @param id - 要更新的记录ID
 * @param updates - 包含更新字段的对象
 * @returns 更新成功后的记录数据
 */
export const update = async <T extends Record<string, any>>(tableName: string, id: string | number, updates: T) => {
  const { data, error } = await supabase.from(tableName).update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

/**
 * 根据ID删除指定表中的一条记录
 * @param tableName - 表名
 * @param id - 要删除的记录ID
 * @returns 被删除的记录的数据
 */
export const remove = async (tableName: string, id: string | number) => {
  const { data, error } = await supabase.from(tableName).delete().eq('id', id).select().single();
  if (error) throw error;
  return data;
};
