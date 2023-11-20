export interface Read<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
}

export interface Write<T> {
  insert(item: T): Promise<boolean>;
  update(id: string, replacement: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}

export interface Repository<T> extends Read<T>, Write<T> {}
